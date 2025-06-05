import {arrayProjectsPortifolio} from "./modules/projects-array.js";

//Seleciona todos os botões do header
    const sobreMimButton = document.getElementById('about-me');
    const projetosButton = document.getElementById('projects');
    const tecnologiasButton = document.getElementById('technologies');
    const contatoButton = document.getElementById('contact');

//Seleciona o botao do menu mobile
    const menuMobileButton = document.getElementById('menu-mobile-button');
    //Seleciona o modal do menu mobile
    const modalMenuMobile = document.getElementById('menu-mobile-modal');

//Seleciona todos os botões do menu mobile para navegação
    const sobreMimButtonMobile = document.getElementById('about-me-mobile');
    const projetosButtonMobile = document.getElementById('projects-mobile');
    const tecnologiasButtonMobile = document.getElementById('technologies-mobile');
    const contatoButtonMobile = document.getElementById('contact-mobile');

//seleciona todas as sessões para navegação
    const sobreMimSection = document.getElementById('about-me-section');
    const projetosSection = document.getElementById('projects-section');
    const tecnologiasSection = document.getElementById('technologies-section');
    const contatoSection = document.getElementById('contact-section');

//Abre Modal do menu mobile
    menuMobileButton.addEventListener('click', () => {modalMenuMobile.style.display = 'block'})

//Cria navegação ao clicar nos respectivos botões do header
    sobreMimButton.addEventListener('click', () => {sobreMimSection.scrollIntoView({behavior: 'smooth', block: 'start'})})
    sobreMimButtonMobile.addEventListener('click', () => {sobreMimSection.scrollIntoView({behavior: 'smooth', block: 'start'})})

    projetosButton.addEventListener('click', () => {projetosSection.scrollIntoView({behavior: 'smooth', block: 'start'})})
    projetosButtonMobile.addEventListener('click', () => {projetosSection.scrollIntoView({behavior: 'smooth', block: 'start'})})

    tecnologiasButton.addEventListener('click', () => {tecnologiasSection.scrollIntoView({behavior: 'smooth', block: 'start'})})
    tecnologiasButtonMobile.addEventListener('click', () => {tecnologiasSection.scrollIntoView({behavior: 'smooth', block: 'start'})})

    contatoButton.addEventListener('click', () => {contatoSection.scrollIntoView({behavior: 'smooth', block: 'start'})})
    contatoButtonMobile.addEventListener('click', () => {contatoSection.scrollIntoView({behavior: 'smooth', block: 'start'})})

//Mantém o botão com a coloração de destaque na seção que estiver sendo exibida na tela
    sobreMimSection.addEventListener('mouseover', () =>{sobreMimButton.classList.toggle('is-focus')})
    sobreMimSection.addEventListener('mouseout', () =>{sobreMimButton.classList.toggle('is-focus')})

    projetosSection.addEventListener('mouseover', () =>{projetosButton.classList.toggle('is-focus')})
    projetosSection.addEventListener('mouseout', () =>{projetosButton.classList.toggle('is-focus')})

    tecnologiasSection.addEventListener('mouseover', () =>{tecnologiasButton.classList.toggle('is-focus')})
    tecnologiasSection.addEventListener('mouseout', () =>{tecnologiasButton.classList.toggle('is-focus')})

    contatoSection.addEventListener('mouseover', () =>{contatoButton.classList.toggle('is-focus')})
    contatoSection.addEventListener('mouseout', () =>{contatoButton.classList.toggle('is-focus')})

//CRIAR CARDS COM OS PROJETOS
    //Iniciar variável para determinar o slide atual para ser mostrado
    let actualProject = 1;
    let nextProject = 1; 
    //Pegar variável
    const projectsContainer = document.getElementById("projects-container")

    //Criar containers project a partir do array de todos os projetos

    arrayProjectsPortifolio.forEach( project => {

        //Criar div externa do projeto com seus elementos internos
        const divProject = document.createElement('div')
        divProject.className = "project"
        divProject.id = `project-${project.id}`

        const titleProject = document.createElement('h3')
        titleProject.innerText = project.title

        const projectImageContainer = document.createElement('div')
        projectImageContainer.className = "project-image-container"

        const projectImage = document.createElement('img')
        projectImage.className = "preview"
        projectImage.id = project.img.id
        projectImage.alt = project.img.alt
        projectImage.src = project.img.src

        const descriptionProject = document.createElement('p')
        descriptionProject.className = "description-project"
        descriptionProject.innerText = project.description

        const linkProject = document.createElement('span')
        linkProject.className = "link-project"
        linkProject.innerHTML = `Clique <a target="_blank" href="${project.link}">aqui</a> para ver o projeto no gitHub`

        projectsContainer.appendChild(divProject)
        divProject.appendChild(titleProject)
        divProject.appendChild(projectImageContainer)
        divProject.appendChild(descriptionProject)
        divProject.appendChild(linkProject)
        projectImageContainer.appendChild(projectImage)

        //Inicializar o primeiro projeto como ativo
        if(project.id === 1)
            divProject.classList.toggle("active")
    })
    
// Slide entre projetos

    // Variável para indicar que o slide ainda não foi iniciado
    let slideInterval = null; 

    // Função para iniciar o slide automático
    function startSlideProject() {
    // Verifica se já não há um intervalo ativo para evitar múltiplos intervalos
        if (slideInterval === null) {
            slideInterval = setInterval(() => {
                checkNextProject(1);
            }, 5000);
        }
    }

    // Função para pausar o slide automático
    function stopSlideProject() {
    // Limpa o intervalo apenas se existir
        if (slideInterval !== null) {
            clearInterval(slideInterval);
            slideInterval = null;
        }
    }

    //Criar slide automático a cada 5 segundos ao carregar a página, somente quando estiver na section projects
    projetosSection.addEventListener('mouseenter', startSlideProject)
    projetosSection.addEventListener('mouseleave', stopSlideProject)

     //Desativar slide automático quando o mouse estiver em cima do projects container
     // Variáveis para controle de tempo
    let mouseEnterTimeout;
    const SLIDE_DELAY = 300; // milissegundos

    projectsContainer.addEventListener('mouseenter', () => {
        mouseEnterTimeout = setTimeout(stopSlideProject, SLIDE_DELAY);
        }
    );

    projectsContainer.addEventListener('mouseleave', () => {
    clearTimeout(mouseEnterTimeout);
    startSlideProject();
    });

    //Pega as setas para navegar entre projetos
    const backButton = document.getElementsByClassName("back-arrow")[0]
    const backButtonMobile = document.getElementsByClassName("back-arrow")[1]
    const forwardButton = document.getElementsByClassName("forward-arrow")[0]
    const forwardButtonMobile = document.getElementsByClassName("forward-arrow")[1]

    //Aciona funcao para navegar entre projetos ao clicar nos botões
    backButton.addEventListener('click', () => checkNextProject(-1))
    backButtonMobile.addEventListener('click', () => checkNextProject(-1))
    forwardButton.addEventListener('click', () => checkNextProject(1))
    forwardButtonMobile.addEventListener('click', () => checkNextProject(1))

    //Verifica o próximo projeto a ser mostrado, caso já esteja mostrando o último ou primeiro projeto, ele continua o ciclo voltando para o primeiro ou último projeto
    function checkNextProject(increment){
        
    if(actualProject + increment > arrayProjectsPortifolio.length){
        nextProject = 1
    } else if(actualProject + increment <= 0){
        nextProject = arrayProjectsPortifolio.length
    }else{
        nextProject += increment
    }
    
    projectToggle(actualProject, nextProject)
    //Reatribui o next como actual project
    actualProject = nextProject;
    }

    function projectToggle(actualProject, nextProject){
    //Remove classe ativa do projeto atual
        document.getElementById(`project-${actualProject}`).classList.toggle("active");
    //Adiciona classe ativa do proximo porjeto
        document.getElementById(`project-${nextProject}`).classList.toggle("active");
    stopSlideProject();
    startSlideProject();
    }