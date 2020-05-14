const API_URL = "https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72";

let currentPage = 1;

const ITEMS_PER_PAGE = 8;

const fetchAPI = async (url) => {
    let response = await fetch(url)
    const textResponse = await response.text()
    return JSON.parse(textResponse)
}

const filterPlaces = (input, places) => {
    return places.filter(place => place.name.toLowerCase().includes(input.value.toLowerCase()))
}

const paginateData = (data) => { // console.log(data)
    return data.reduce((total, current, index) => {
        const belongArrayIndex = Math.ceil((index + 1) / ITEMS_PER_PAGE) - 1
        total[belongArrayIndex] ? total[belongArrayIndex].push(current) : total.push([current])
        return total
    }, [])
}

const changePage = (pageToBeRendered) => {
    currentPage = pageToBeRendered
    renderPage()
}

const renderPaginationMenu = (paginatedData) => {
    const paginationContainer = document.querySelector(".paginate__list");

    //esvaziamos essa div a cada render para que não seja rendedrizado o menu com os dados da página antiga do usuário
    while (paginationContainer.firstChild) {
        paginationContainer.removeChild(paginationContainer.firstChild)
    }

    // link previous page.
    const previousPage = document.createElement("li")
    previousPage.className = "paginate__item"
    previousPage.addEventListener('click', () => currentPage <= 1 ? () => { } : changePage(currentPage - 1))

    const linkPreviousPage = document.createElement("a")
    linkPreviousPage.className = "paginate__link"
    linkPreviousPage.href = "javascript:void();"
    linkPreviousPage.innerHTML = '<i class="fa fa-chevron-left" aria-hidden="true"></i>'

    // Add o elemento dom dentro do container da paginação.
    paginationContainer.appendChild(previousPage)
    previousPage.appendChild(linkPreviousPage)

    // link pagination
    paginatedData.forEach((_, index) => {
        const pageButton = document.createElement("li")
        pageButton.className = "paginate__item"
        
        const linkPageButton = document.createElement("a")
        linkPageButton.className = "paginate__link"
        linkPageButton.href = "javascript:void();"
        linkPageButton.innerHTML = index + 1

        pageButton.addEventListener("click", () => changePage(index + 1))

        if (currentPage === index + 1) {
            pageButton.className += " active"
        }

        // Add o elemento dom dentro do container da paginação.
        paginationContainer.appendChild(pageButton)
        pageButton.appendChild(linkPageButton)
    })

    // link previous page.
    const nextPage = document.createElement("li")
    nextPage.className = "paginate__item"
    nextPage.addEventListener('click', () => currentPage >= paginatedData.length ? () => { } : changePage(currentPage + 1))
    
    const linkNextPage = document.createElement("a")
    linkNextPage.className = "paginate__link"
    linkNextPage.href = "javascript:void();"
    linkNextPage.innerHTML = '<i class="fa fa-chevron-right" aria-hidden="true"></i>'

    // Add o elemento dom dentro do container da paginação.
    paginationContainer.appendChild(nextPage)
    nextPage.appendChild(linkNextPage)
}

const renderPage = async () => {
    const apiData = await fetchAPI(API_URL)

    // --------- Sistema busca -------------
    const searchInput = document.querySelector("#filter")
    let filteredApiData = filterPlaces(searchInput, apiData)

    const searchButton = document.querySelector('#button-search')
    searchButton.addEventListener('click', () => {
        filteredApiData = filterPlaces(searchInput, apiData)
        renderPage()
    })
    // ----------- FIM --------------

    const paginatedData = paginateData(filteredApiData) // ???

    renderPaginationMenu(paginatedData)
    
    let cardContainer = document.querySelector(".content");

    //esvaziamos nosso container de cards para que não sejam renderizados os cards da página antiga do usuário
    while (cardContainer.firstChild) {
        cardContainer.removeChild(cardContainer.firstChild)
    }

    paginatedData[currentPage - 1].forEach(property => {
        // Captura os dados do recuperados da API e armazena em variáveis.
        const {name, photo, price, property_type} = property

        // Criando a estrutura HTML
        let grid = document.createElement("div")
        grid.className = "col-sm-12 col-md-6 col-lg-4 col-xl-3"

        let card = document.createElement("div")
        card.className = "card m-auto border-0"

        let cardImg = document.createElement("div")
        cardImg.className = "content__card-image"

        let img = document.createElement("img")
        img.className = "card-img-top"
        img.src = photo

        let cardInfo = document.createElement("div")
        cardInfo.className = "card-body"

        let cardInfoTitle = document.createElement("h5")
        cardInfoTitle.className = "card-title"
        cardInfoTitle.innerHTML = name

        let cardInfoDescription = document.createElement("p")
        cardInfoDescription.className = "card-text content__card-description"
        cardInfoDescription.innerHTML = property_type

        let cardInfoPrice = document.createElement("p")
        cardInfoPrice.className = "card-text content__card-price"
        cardInfoPrice.innerHTML = `<strong>${price}</strong><span>,00</span>/diária`

        // Montando a estrutura do HTML DOM
        cardContainer.appendChild(grid)
        grid.appendChild(card)
        card.appendChild(cardImg)
        cardImg.appendChild(img)
        card.appendChild(cardInfo)
        cardInfo.appendChild(cardInfoTitle)
        cardInfo.appendChild(cardInfoDescription)
        cardInfo.appendChild(cardInfoPrice)
    });

}

function initMap() {
    const locations = [
        ['Avenida Paulista', -23.563311, -46.654275, 5],
        ['Gama Academy', -23.567427, -46.684607, 4],
        ['Marco Zero', -23.550460, -46.633934, 3],
        ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
        ['Maroubra Beach', -33.950198, 151.259302, 1]
    ];

    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: new google.maps.LatLng(-23.550460, -46.633934),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    const infowindow = new google.maps.InfoWindow();

    let marker, i;

    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map
        });

        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                infowindow.setContent(locations[i][0]);
                infowindow.open(map, marker);
            }
        })(marker, i));
    }
}

renderPage();