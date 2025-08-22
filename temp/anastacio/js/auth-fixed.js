document.addEventListener('DOMContentLoaded', () => {
    class AuthManager {
        constructor() {
            this.currentMode = 'login';
            this.isMobile = window.innerWidth <= 768;
            this.initElements();
            this.setupEventListeners();
            this.setupInputMasks();
            this.setupResizeObserver();
            // Inicializa a visualização
            this.initializeView();
            this.setupForgotPasswordEvents();
        }

        initElements() {
            // Containers
            this.authContainer = document.getElementById('auth-container');
            this.formPanel = document.querySelector('.form-panel');
            this.overlayPanel = document.querySelector('.overlay-panel');

            // Formulários
            this.forms = {
                login: document.getElementById('login-form'),
                register: document.getElementById('register-form'),
                forgot: document.getElementById('forgot-password-form')
            };

            // Conteúdos dos formulários
            this.formContents = {
                login: document.querySelector('.form-content.login'),
                register: document.querySelector('.form-content.register'),
                forgot: document.querySelector('.form-content.forgot-password-form')
            };

            // Overlays
            this.overlayLeft = document.querySelector('.overlay-left');
            this.overlayRight = document.querySelector('.overlay-right');

            // Botões
            this.buttons = {
                signIn: document.getElementById('signIn'),
                signUp: document.getElementById('signUp'),
                forgotPassword: document.getElementById('forgot-password-link'),
                backToLogin: document.getElementById('back-to-login-link')
            };
        }

        initializeView() {
            // Garante que o formulário de login esteja visível inicialmente
            this.formContents.login.style.display = 'flex';
            this.formContents.register.style.display = 'none';
            this.formContents.forgot.style.display = 'none';

            // Garante que o overlay esteja visível
            this.overlayRight.style.display = 'flex';
            this.overlayLeft.style.display = 'none';

            // Remove qualquer estado anterior
            this.authContainer.classList.remove('register-active', 'forgot-password-active');
            this.formPanel.classList.remove('register-active');
        }

        setupEventListeners() {
            // Delegation para eventos de clique
            document.addEventListener('click', (e) => {
                const target = e.target;

                if (target.id === 'signUp') {
                    e.preventDefault();
                    // Se já estiver no registro, volta para login
                    if (this.currentMode === 'register') {
                        this.setMode('login');
                    } else {
                        this.setMode('register');
                    }
                }
                
                if (target.id === 'signIn') {
                    e.preventDefault();
                    this.setMode('login');
                }
            });

            // Eventos de formulário
            this.forms.login.addEventListener('submit', (e) => this.handleSubmit(e, 'login'));
            this.forms.register.addEventListener('submit', (e) => this.handleSubmit(e, 'register'));
            this.forms.forgot.addEventListener('submit', (e) => this.handleSubmit(e, 'forgot'));

            // Validação em tempo real
            this.setupLiveValidation();
        }

        setupInputMasks() {
            // Máscara para CPF
            const cpfInput = document.getElementById('register-cpf');
            if (cpfInput) {
                cpfInput.addEventListener('input', (e) => {
                    let value = e.target.value.replace(/\D/g, '');
                    value = value.replace(/(\d{3})(\d)/, '$1.$2')
                                 .replace(/(\d{3})(\d)/, '$1.$2')
                                 .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
                    e.target.value = value;
                });
            }

            // Máscara para CEP
            const cepInput = document.getElementById('register-cep');
            if (cepInput) {
                cepInput.addEventListener('input', (e) => {
                    let value = e.target.value.replace(/\D/g, '');
                    value = value.replace(/(\d{5})(\d)/, '$1-$2');
                    e.target.value = value;
                });
            }
        }

        setupLiveValidation() {
            // Validação em tempo real para todos os inputs
            document.querySelectorAll('input').forEach(input => {
                input.addEventListener('blur', () => this.validateInput(input));
                input.addEventListener('input', () => {
                    const inputGroup = input.parentElement;
                    inputGroup.classList.remove('success', 'error');
                    const errorMessage = inputGroup.querySelector('.error-message');
                    if (errorMessage) errorMessage.textContent = '';
                });
            });
        }

        setupForgotPasswordEvents() {
            // Link para esqueceu senha
            const forgotPasswordLink = document.getElementById('forgot-password-link');
            const backToLoginLink = document.getElementById('back-to-login-link');
            
            if (forgotPasswordLink) {
                forgotPasswordLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.setMode('forgot');
                });
            }

            if (backToLoginLink) {
                backToLoginLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.setMode('login');
                });
            }
        }

        setMode(mode) {
            this.currentMode = mode;
            
            // Reset all states first to prevent conflicts
            this.resetAllStates();
            
            switch (mode) {
                case 'register':
                    this.showRegisterMode();
                    break;
                case 'login':
                    this.showLoginMode();
                    break;
                case 'forgot':
                    this.showForgotMode();
                    break;
            }

            // Atualiza os estados ARIA
            this.updateAriaStates(mode);

            // Atualiza o texto do botão
            const signUpButton = document.getElementById('signUp');
            if (signUpButton) {
                signUpButton.textContent = mode === 'register' ? 'Logar' : 'Cadastrar';
            }
            
            // Force reflow to ensure proper rendering
            void this.authContainer.offsetHeight;
        }

        resetAllStates() {
            // Remove all active states
            this.authContainer.classList.remove('register-active', 'forgot-password-active');
            this.formPanel.classList.remove('register-active');
            
            // Reset all form displays
            Object.values(this.formContents).forEach(content => {
                content.style.display = 'none';
                content.style.opacity = '';
                content.style.transform = '';
            });
            
            // Reset overlay
            this.overlayPanel.style.display = 'block';
            this.overlayLeft.style.display = 'none';
            this.overlayRight.style.display = 'none';
        }

        showRegisterMode() {
            this.authContainer.classList.add('register-active');
            this.formPanel.classList.add('register-active');
            
            // Ensure register form is properly initialized
            this.formContents.register.style.display = 'flex';
            this.formContents.register.style.opacity = '1';
            this.formContents.register.style.transform = 'translateX(0)';
            
            this.overlayLeft.style.display = 'flex';
            this.overlayRight.style.display = 'none';
            
            // Reset form validation state
            this.clearFormValidation(this.forms.register);
            
            // Scroll to top of register form
            this.formContents.register.scrollTop = 0;
        }

        showLoginMode() {
            this.formContents.login.style.display = 'flex';
            this.formContents.login.style.opacity = '1';
            this.formContents.login.style.transform = 'translateX(0)';
            
            this.overlayLeft.style.display = 'none';
            this.overlayRight.style.display = 'flex';
            
            // Reset form validation state
            this.clearFormValidation(this.forms.login);
        }

        showForgotMode() {
            this.authContainer.classList.add('forgot-password-active');
            
            this.formContents.forgot.style.display = 'flex';
            this.formContents.forgot.style.opacity = '1';
            this.formContents.forgot.style.transform = 'translateX(0)';
            
            this.overlayPanel.style.display = 'none';
            
            // Reset form validation state
            this.clearFormValidation(this.forms.forgot);
        }

        updateAriaStates(mode) {
            // Atualiza os estados expanded dos botões
            if (this.buttons.signUp) {
                this.buttons.signUp.setAttribute('aria-expanded', mode === 'register');
            }
            if (this.buttons.signIn) {
                this.buttons.signIn.setAttribute('aria-expanded', mode === 'login');
            }
        }

        updateUI() {
            const isRegisterActive = this.currentMode === 'register';
            this.authContainer.classList.toggle('register-active', isRegisterActive);
            this.formPanel.classList.toggle('register-active', isRegisterActive);
            
            // Atualizar ARIA
            this.buttons.signUp.setAttribute('aria-expanded', isRegisterActive);
            this.buttons.signIn.setAttribute('aria-expanded', !isRegisterActive);

            // Limpa estados anteriores
            this.authContainer.classList.remove('forgot-password-active');
            this.formPanel.classList.remove('forgot-password-active');
            this.overlayPanel.classList.remove('register-active', 'forgot-password-active');

            if (this.isMobile) {
                this.handleMobileView();
            } else {
                this.handleDesktopView();
            }
        }

        handleDesktopView() {
            // Remove qualquer estilo inline que possa ter sido adicionado
            Object.values(this.formContents).forEach(content => {
                content.style.display = '';
            });
        }

        handleMobileView() {
            Object.values(this.formContents).forEach(content => {
                content.style.display = 'none';
            });
            this.formContents[this.currentMode].style.display = 'flex';
        }

        handleInitialView() {
            if (this.isMobile) {
                this.formContents.login.style.display = 'flex';
                this.overlayRight.style.display = 'flex';
            }
        }

        setupResizeObserver() {
            let resizeTimer;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => {
                    const newIsMobile = window.innerWidth <= 768;
                    if (newIsMobile !== this.isMobile) {
                        this.isMobile = newIsMobile;
                        this.updateUI();
                    }
                }, 200);
            });
        }

        validateInput(input) {
            const inputGroup = input.parentElement;
            inputGroup.classList.remove('success', 'error');
            
            const errorMessage = inputGroup.querySelector('.error-message');
            if (errorMessage) errorMessage.textContent = '';

            if (!input.value.trim()) return false;

            let isValid = true;
            let message = '';

            if (input.type === 'email') {
                isValid = this.validateEmail(input.value);
                message = 'Por favor, insira um e-mail válido';
            } else if (input.id.includes('password')) {
                isValid = input.value.length >= 8 && input.value.length <= 25;
                message = 'A senha deve ter entre 8 e 25 caracteres';
            } else if (input.id.includes('cpf')) {
                isValid = this.validateCPF(input.value);
                message = 'Por favor, insira um CPF válido';
            }

            if (isValid) {
                inputGroup.classList.add('success');
            } else {
                inputGroup.classList.add('error');
                if (errorMessage) errorMessage.textContent = message;
            }

            return isValid;
        }

        validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email.toLowerCase());
        }

        validateCPF(cpf) {
            cpf = cpf.replace(/\D/g, '');
            if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
            
            let sum = 0;
            for (let i = 0; i < 9; i++) sum += parseInt(cpf.charAt(i)) * (10 - i);
            let mod = sum % 11;
            const digit1 = mod < 2 ? 0 : 11 - mod;
            
            sum = 0;
            for (let i = 0; i < 10; i++) sum += parseInt(cpf.charAt(i)) * (11 - i);
            mod = sum % 11;
            const digit2 = mod < 2 ? 0 : 11 - mod;
            
            return digit1 === parseInt(cpf.charAt(9)) && digit2 === parseInt(cpf.charAt(10));
        }

        validateForm(formType) {
            const form = this.forms[formType];
            let isValid = true;

            // Valida todos os campos obrigatórios
            form.querySelectorAll('[required]').forEach(input => {
                if (!input.value.trim()) {
                    this.showError(input, 'Este campo é obrigatório');
                    isValid = false;
                } else if (!this.validateInput(input)) {
                    isValid = false;
                }
            });

            // Validação específica para senhas iguais
            if (formType === 'register') {
                const password = form.querySelector('#register-password');
                const confirmPassword = form.querySelector('#register-password-confirm');
                
                if (password && confirmPassword && password.value !== confirmPassword.value) {
                    this.showError(confirmPassword, 'As senhas não coincidem');
                    isValid = false;
                }
            }

            return isValid;
        }

        showError(input, message) {
            const inputGroup = input.parentElement;
            inputGroup.classList.remove('success');
            inputGroup.classList.add('error');
            const errorMessage = inputGroup.querySelector('.error-message');
            if (errorMessage) errorMessage.textContent = message;
        }

        showSuccess(input) {
            const inputGroup = input.parentElement;
            inputGroup.classList.remove('error');
            inputGroup.classList.add('success');
            const errorMessage = inputGroup.querySelector('.error-message');
            if (errorMessage) errorMessage.textContent = '';
        }

        validatePassword(password) {
            const minLength = 8;
            const hasNumber = /\d/.test(password);
            const hasUpper = /[A-Z]/.test(password);
            const hasLower = /[a-z]/.test(password);
            const hasSpecial = /[!@#$%^&*]/.test(password);
            
            return password.length >= minLength && hasNumber && hasUpper && hasLower && hasSpecial;
        }

        async handleSubmit(e, formType) {
            e.preventDefault();
            
            if (!this.validateForm(formType)) {
                this.shakeForm();
                return;
            }

            const form = this.forms[formType];
            const submitButton = form.querySelector('button[type="submit"]');
            const buttonText = submitButton.querySelector('.button-text');
            const spinner = submitButton.querySelector('.spinner');

            // Mostra o spinner
            submitButton.disabled = true;
            buttonText.style.opacity = '0';
            spinner.classList.add('visible');

            try {
                // Simula uma requisição assíncrona
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Feedback visual
                this.showSuccessMessage(formType);
                
                // Limpa o formulário se necessário
                if (formType === 'register' || formType === 'forgot') {
                    form.reset();
                    if (formType === 'register') this.setMode('login');
                    if (formType === 'forgot') this.setMode('login');
                }
            } catch (error) {
                console.error('Erro no formulário:', error);
                this.shakeForm();
            } finally {
                // Restaura o botão
                submitButton.disabled = false;
                buttonText.style.opacity = '1';
                spinner.classList.remove('visible');
            }
        }

        showSuccessMessage(formType) {
            const messages = {
                login: 'Login realizado com sucesso!',
                register: 'Cadastro concluído! Faça login para continuar.',
                forgot: 'Instruções de recuperação enviadas para seu e-mail!'
            };
            
            // Aqui você pode substituir por um toast ou modal mais elegante
            alert(messages[formType]);
        }

        shakeForm() {
            this.auth
