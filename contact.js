//Pega o Formulário e adicionar função para lidar com o envio
document.querySelector('form').addEventListener('submit', handleSubmit)

// Testes de validação do formulário
function handleSubmit(e){
    //Pegar os campos do formulário dentro do handlesubmit para usar valores atualizados no momento do envio
    //Pega os valores!!!
    const formName = document.getElementById('name')
    const formPhone = document.getElementById('phone')
    const formEmail = document.getElementById('email')
    const formMessage = document.getElementById('message')

    //Pega os campos para inserir mensagem de erro
    const nameError = document.getElementById('name-error')
    const phoneError = document.getElementById('phone-error')
    const emailError = document.getElementById('email-error')
    const messageError = document.getElementById('message-error')

    //Verifica se os campos estão válidos com a função formValidation
    const nameIsValid = formValidation(formName, nameError)
    const phoneIsValid = formValidation(formPhone, phoneError)
    const emailIsValid = formValidation(formEmail, emailError) 
    const messageIsValid = formValidation(formMessage, messageError)

    //Ver se todos os campos passaram na validação, caso contrário coloca foco no campo incorreto na parte mais superior

    if(nameIsValid && phoneIsValid && emailIsValid && messageIsValid){
        //Validação Passou
        phoneError.style.display = "none"
        return
    } else{
        //Validação não passou
        e.preventDefault()
        
    //Coloca foco no campo que ta inválido, respeitando a ordem do formulário
        messageIsValid === false && formMessage.focus()
        emailIsValid === false && formEmail.focus()
        phoneIsValid === false && formPhone.focus()
        nameIsValid === false && formName.focus()

    //Caso os campos obrigatórios sejam verdadeiros
        if(nameIsValid && emailIsValid && messageIsValid){
        // Verifica se o telefone foi preenchido corretamente, caso o usuário decida informar
        phoneIsValid ?
            phoneError.style.display = "none" // Mostrar apenas se o telefone foi preenchido incorretamente
        :
            phoneError.style.display = "block" // Não mostrar caso esteja vazio
    //Apaga mensagem de erro do campo do Phone   
        }
        return
    }
}

function formValidation(formInput, inputError){ //Função que retorna true se o campo é válido e false se é inválido
    //Inicializa mensagem de error
    let messageError = ""
    //Inicializa todos os inputIsValid como true
    let inputIsValid = true

    //Verifica se é o campo de telefone, único não obrigatório
    // Mas caso seja preechido, demos aceitar somente números
    if(formInput.id === "phone"){
        //Parâmetro para validar input
        const phoneRegex = /^[0-9]\d*$/; // Expressão regular para números inteiros POSITIVOS ou ZERO

        //Verifica se é vazio, em caso positivo emite mensagem, apesar de não obrigatório, oriento a preencher
        if(formInput.value.trim() === ""){
            messageError = "Este campo não é obrigatório, mas pode facilitar a comunicação. Sinta-se a vontade para preencher ou não"
            inputIsValid = true // Como não é obrigatório, se for o único input em branco o formulário vai ser enviado
        
        // Verifica sem tem mínimo de 11 caracteres, caso não seja vazio
        } else if(formInput.value.length < 10){
            messageError = "Digite um telefone válido com o DDD"
            inputIsValid = false
        //Caso tenha o mínimo de 11 caracteres, verifica se contém apenas números
        //metodo test retorna um boolean
        } else if(phoneRegex.test(formInput.value)){
            //caso sejam somente números positivos
            inputIsValid = true
        } else{
            messageError = "Digite apenas números"
            inputIsValid = false
        }

        //Imprime a mensagem de erro, caso tenha e Retorna se o campo é valido
        inputError.innerText = messageError
        return inputIsValid 
    } 

    // Para todos os campos obrigatórios, verifica se está vazio e preenche a mensagem adequada
    if (formInput.value.trim() === ""){
        // Criar mensagem de erro para campos vazios
        messageError = "Este campo é obrigatório"
        inputIsValid = false

        inputError.innerText = messageError
        return inputIsValid
    }
    
    //Verificar cada campo (Name, Email e Message) (Casos que não são vazios)

    //Validação Nome (caso que não é vazio)
    if(formInput.id === "name"){
        const nameRegex = /^[a-zA-ZÀ-ÿ\s]+$/ //Expressão Regex para letras, espaços e acentos
        //Verifica se tem no mínimo 3 letras
        if(formInput.value.trim().length < 3){
            messageError = "Campo nome precisa ter no mínimo 3 letras"
            inputIsValid = false
        //Verificar se só contem caracteres para texto tipo nome
        } else if(nameRegex.test(formInput.value)){
            inputIsValid = true
        
        } else{
            messageError = "Neste campo não são aceitos apenas letras, espaços e acentos"
            inputIsValid = false
        }
        inputError.innerText = messageError
        return inputIsValid
    }

    //Validação Email (caso que não é vazio)
    if(formInput.id === "email"){
        const emailRegex = /\S+@\S+\.\S+/ //Expressão Regex para validar emails
        if(emailRegex.test(formInput.value)){
            inputIsValid = true
        } else{
            messageError = "Por favor, utilize um email válido"
            inputIsValid = false
        }
        inputError.innerText = messageError
        return inputIsValid
    }

    //Validação Message (caso que não é vazio)
    if(formInput.id === "message"){
       if(formInput.value.trim().length < 10){
        messageError = "Este campo precisa conter no mínimo 10 letras"
        inputIsValid = false
       } 
       inputError.innerText = messageError
       return inputIsValid
    }   
}