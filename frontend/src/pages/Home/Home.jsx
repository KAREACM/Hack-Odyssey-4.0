import React from 'react'
import Hero from '../../components/Hero/Hero'
import Welcome from '../../components/Welcome/Welcome'
import Coordinators from '../../components/Coordinators/Coordinators'
import PrizePool from '../../components/PrizePool/PrizePool'
import Winners from '../../components/Winners/Winners'
import BenefitVideo from '../../components/BenefitVideo/BenefitVideo'
import Gallery from '../../components/Gallery/Gallery'
import FAQ from '../../components/FAQ/FAQ'
import MapLink from '../../components/MapLink/MapLink'

const Home = () => {
    return (
        <div className="overflow-x-hidden">
            <Hero />
            <Welcome />
            <Coordinators />
            <PrizePool />
            <Winners />
            <BenefitVideo />
            <Gallery />
            <FAQ />
            <MapLink />
        </div>
    )
}

export default Home