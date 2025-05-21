import { arrayTechnologies } from "./modules/technologies-array.js";
    
    // Pegar container
    const technologiesContainer = document.getElementById("view-container-technologies")

    //Criar Image Containers
    arrayTechnologies.forEach(technology => {
        const imgContainerTechnology = document.createElement('figure')
        imgContainerTechnology.className = "img-container-technologies"
        imgContainerTechnology.id = `technology-${technology.id}`

        const technologyImage = document.createElement('img')
        technologyImage.className = "technologies-images"
        technologyImage.id = `${technology.technologyName}-img`
        technologyImage.alt = `logo ${technology.technologyName} tecnology`
        technologyImage.src = technology.src

        const technologyLegend = document.createElement('figcaption')
        technologyLegend.id = `${technology.technologyName}-legend`
        technologyLegend.innerText = technology.technologyName

        technologiesContainer.appendChild(imgContainerTechnology)
        imgContainerTechnology.appendChild(technologyImage)
        imgContainerTechnology.appendChild(technologyLegend)
    })