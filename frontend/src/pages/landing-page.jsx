import Footer from "../components/Footer";
import Header from "../components/Header";
import HighLights from "../components/HighLights";
import Carrousel from "../components/Carrousel";
import ValentineDay from "../components/ValentineDay";
import FatherDay from "../components/FatherDay";
import NatalDay from "../components/NatalDay";
import Undefined from "../components/Undefined";
import Undefined2 from "../components/Undefined2";


function LandingPage () {
    return (
        <>
            <Header/>
            <main>
                <Carrousel/>
                <HighLights/>
                <FatherDay/>
                <Undefined/>
                <ValentineDay/>
                <Undefined2/>
                <NatalDay/>
            </main>
            <Footer/>

        </>
    )
};

export default LandingPage;