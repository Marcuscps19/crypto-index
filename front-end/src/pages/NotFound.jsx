import Header from '../components/Header';

function NotFound() {

    return (
            <div>
                <Header />
                <div className='container-not-found'>
                    <h1 className="title-not-found">Não encontramos o que você buscava</h1>
                    <img 
                        src="https://http.cat/404" 
                        alt="Erro 404 - imagem de um gato se escondendo no meio de papéis." 
                        className="img-not-found"
                    />
                </div>
            </div>
    )
}

export default NotFound;