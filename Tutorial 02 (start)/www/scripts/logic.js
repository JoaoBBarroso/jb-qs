$(document).ready(function () {

    var buttonGravar = $('#gravar');
    var buttonRemover = $('#remover');
    var buttonLimpar = $('#limpar');
    var productList = [];

    var list = (function (e) {
        lista = JSON.parse(sessionStorage.getItem('lista'))
        console.log(lista)
        productList = lista;
        console.log(productList)
        console.log($('#product-table'));



        setList = function (e) {
            var table = document.createElement("TABLE");
            table.setAttribute('id', 'product-table');

            var trNomeQuantidadeHeader = document.createElement("TR");

            var thNomeHeader = document.createElement("TH");
            thNomeHeader.appendChild(document.createTextNode("Nome"));
            var thQuantidadeHeader = document.createElement("TH");
            thQuantidadeHeader.appendChild(document.createTextNode("Quant."));

            trNomeQuantidadeHeader.appendChild(thNomeHeader);
            trNomeQuantidadeHeader.appendChild(thQuantidadeHeader);
            table.appendChild(trNomeQuantidadeHeader);

            if (productList) {
                productList.map((elem) => {
                    var tr = document.createElement("TR");

                    var item = document.createTextNode(elem.item);
                    var quantidade = document.createTextNode(elem.quantidade);

                    var tdItem = document.createElement("TD");
                    var tdQuantidade = document.createElement("TD");


                    tdItem.appendChild(item);
                    tdQuantidade.appendChild(quantidade);
                    tr.appendChild(tdItem);
                    tr.appendChild(tdQuantidade);

                    table.appendChild(tr);
                })

                console.log(table);
                console.log($('#table'))
                $("#table").append(table);
            }
        }

        return {
            setList: setList
        }

    })();

    var ss = (function () {

        list.setList();

        this.sessionStorageGravar = function (e) {
            console.log(sessionStorage)
            var i = $('#item')[0].value, q = $('#quantidade')[0].value;

            if (!productList)
                productList = [];

            productList.push({
                item: i,
                quantidade: q
            })

            console.log(productList);

            sessionStorage.setItem("lista", JSON.stringify(productList));
            $('table#product-table').remove();
            list.setList();
            return false;
        }

        this.getSessionStorage = function (e) {
            lista = JSON.parse(sessionStorage.getItem('lista'))

            lista.map((elem) => {
                console.log(elem)
            })
        }

        this.sessionStorageRemover = function (e) {
            var text = $('#item')[0].value;
            lista = JSON.parse(sessionStorage.getItem('lista'))
            lista.map((elem, i) => {
                if (elem.item === text) {
                    lista.splice(i, 1);
                }
            })
            console.log(lista)
            sessionStorage.setItem("lista", JSON.stringify(lista));
            $('table#product-table').remove();
            list.setList();
        }



        this.sessionStorageLimpar = function (e) {
            sessionStorage.clear();
        }

        buttonGravar.click(sessionStorageGravar);
        buttonRemover.click(sessionStorageRemover);
        buttonLimpar.click(sessionStorageLimpar);
    })();
});