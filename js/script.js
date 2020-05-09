$(document).ready(function () {

    const URL = "https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72";

    // Listando os feeds de locação da API.
    $.get(URL, {}, (data) => {

        let totalFeeds = data.length;

        // Oculta a informação da quantidade de resultados da busca.
        if (totalFeeds > 0) {
            $(".header__amount").html(`Mais de ${totalFeeds} acomodações para hospedagem.`);
        }

        // Lista os feeds.
        data.forEach(element => {
            $(".content").append(`
                <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3">
                    <div class="card m-auto border-0">
                        <div class="content__card-image">
                            <img src="${element.photo}" class="card-img-top" alt="${element.property_type}">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${element.property_type}</h5>
                            <p class="card-text content__card-description">${element.name}</p>
                            <p class="card-text content__card-price"><strong>R$ ${element.price}</strong><span>,00</span>/diária</p>
                            <a href="#">Reservar</a>
                        </div>
                    </div>
                </div>
            `);
        });
    });
    
    // TODO - Verifica junto ao slack para ver se o autor compartilhou o codigo dele para comparar e ver o por que não esta funfando.

    // const PAGING_OPTIONS = { 
    //     totalCount: 0,      // O conteúdo total contar
    //     itemPerPage: 12,    // Quantos itens serão mostrados por página
    //     initialPage: 1,     // inicial Página (Podemos definir este parâmetro através da detecção de página atual da string de consulta)
    //     get totalPage() {   // Calculando a contagem total de páginas retornando Math.ceil (this.totalCount / this.itemPerPage) // Estou usando Math.ceil para teto
    //         return Math.ceil(this.totalCount / this.itemPerPage)
    //     }, 
    //     local: ".paging",   // É o seletor a ser renderizado URL do componente de paginação : "/ api / contents /? id = 5a5e47ec7152d929bc6d4280 & p =" // O endereço da URL que será solicitado após a alteração de cada página. 
    // }

    // const PAGING = {
    //     append,
    //     bindEventHandlers,
    //     createButton,
    //     createPaging,
    //     createPaging,
    //     getContent,
    //     getData,
    //     handleItemClick,
    //     handleNextClick,
    //     handlePrevClick,
    //     init
    // }

    // init: options => {
    //     PAGING.createPaging(options, () => {
    //         PAGING.bindEventHandlers(options);
    //         PAGING.getContent(options.URL + options.initialPage);
    //     });
    // };

    // createButton: ({direction, isActive = true, text, isCurrent, index}) => {
    //     const DIRECTION_CLASS = direction === "back" ? "paging__btn--nav paging__btn--back" 
    //                                                  : direction === "next" ? "paging__btn--nav paging__btn--back" 
    //                                                                        : "",
    //           BUTTON_TEXT = direction === "back" ? "&laquo;" : direction === "next" ? "&raquo;" : text,
    //           ACTIVE_CLASS = !isActive ? "paging__btn--disabled" : "",
    //           CURRENT_CLASS = isCurrent ? "paging__btn--current" : "",
    //           MODIFIERS = [ACTIVE_CLASS, CURRENT_CLASS, DIRECTION_CLASS],
    //           BUTTON_HTML = `<button data-page-index="${index}" class="paging__btn ${MODIFIERS.join(" ")}">${BUTTON_TEXT}</button>`;
    
    //     return BUTTON_HTML;
    // };

    // PAGING.init(PAGING_OPTIONS);


    // const myRequest = new Request(URL, {method: "GET"});
    // console.log(myRequest)
        
});