function formatCPF(cpf){
    cpf = cpf.replace(/\D/g,"") // Remover tudo o que não é dígito
    cpf = cpf.replace(/(\d{3})(\d)/,"$1.$2") // Colocar um ponto entre o terceiro e o quarto dígitos
    cpf = cpf.replace(/(\d{3})(\d)/,"$1.$2") // Colocar um ponto entre o terceiro e o quarto dígitos segunddo bloco
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/,"$1-$2") // Colocar um hífen entre o terceiro e o quarto dígitos

    return cpf
}

function formatPhone_number(phone_number){
    phone_number = phone_number.replace(/\D/g,""); // Remover tudo o que não é dígito
    phone_number = phone_number.replace(/^(\d{2})(\d)/g,"($1) $2"); // Colocar parênteses em volta dos dois primeiros dígitos
    phone_number = phone_number.replace(/(\d)(\d{4})$/,"$1-$2"); // Colocar hífen entre o quarto e o quinto dígitos

    return phone_number;
}

module.exports = { formatCPF, formatPhone_number }