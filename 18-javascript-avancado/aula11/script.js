/* 

CALLBACKS

*/

function exibirNaTela(fotos){
    let html = ''
    fotos.forEach((item)=>{
        html += `<img src='${item.thumbnailUrl}'>`
    })
    document.querySelector('#container').innerHTML = html
}


const botaoCarregar = document.querySelector('#botaoCarregar')
botaoCarregar.onclick = () => carregarFotos(exibirNaTela)



function carregarFotos(callback){
    const xhttp = new XMLHttpRequest()

    //quando o servidor terminar de fazer as duas requisições seguintes que pedi
    xhttp.onreadystatechange = function () {
        //O código 4 é para quando estiver finalizada a execução
        //200 é o status da operação
        if(this.readyState == 4 && this.status == 200){
            const response = JSON.parse(this.responseText) 
            
            if(callback) callback(response)
        }    
    }

    //conectar com o servidor (true para assincrono, false para sincrono)
    xhttp.open('GET', 'https://jsonplaceholder.typicode.com/photos', true)

    //enviando a conexão
    xhttp.send()
}