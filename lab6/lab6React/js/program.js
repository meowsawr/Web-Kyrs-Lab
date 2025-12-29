// Главный компонент приложения
class Program extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            SearchText: "Поиск...",
            showPlanetMenu: false,
            showMainMenu: false,
            searchDisabled: false
        };
    }

    func_alert = (text) => {
        alert(`Раздел "${text}" недоступен`);
    }

    toggleMenu = () => {
        this.setState(prevState => ({
            showMainMenu: !prevState.showMainMenu,
            showPlanetMenu: false
        }));
    }

    togglePlanet = () => {
        this.setState(prevState => ({
            showPlanetMenu: !prevState.showPlanetMenu,
            showMainMenu: false
        }));
    }

    searchClick = (e) => {
        e.preventDefault();
        alert("Функция поиска на данный момент недоступна");
        this.setState({ 
            SearchText: "Недоступно",
            searchDisabled: true 
        });
        
        setTimeout(() => {
            this.setState({ 
                SearchText: "Поиск...",
                searchDisabled: false 
            });
        }, 2000);
    }

    render() {
        const { SearchText, showPlanetMenu, showMainMenu, searchDisabled } = this.state;

        return (
            <div className="App">
                <header>
                    <div className="header-left">
                        <img 
                            id="logo" 
                            src="https://static.wikia.nocookie.net/honkai-star-rail/images/e/e6/Site-logo.png/revision/latest?cb=20230218221344&path-prefix=ru" 
                            alt="Логотип"
                        />
                        <button 
                            className="menu-button" 
                            onClick={this.togglePlanet}
                        >
                            Планеты
                        </button>
                        
                        {showPlanetMenu && (
                            <div className="dropdown-menu show">
                                <button 
                                    className="menu-item" 
                                    onClick={() => this.func_alert('Космическая станция "Герта"')}
                                >
                                    Космическая станция "Герта"
                                </button>
                                <button 
                                    className="menu-item" 
                                    onClick={() => this.func_alert("Ярило-VI")}
                                >
                                    Ярило-VI
                                </button>
                                <button 
                                    className="menu-item" 
                                    onClick={() => this.func_alert("Лофу Сяньчжоу")}
                                >
                                    Лофу Сяньчжоу
                                </button>
                                <button 
                                    className="menu-item" 
                                    onClick={() => this.func_alert("Пенакония")}
                                >
                                    Пенакония
                                </button>
                                <button 
                                    className="menu-item" 
                                    onClick={() => this.func_alert("Амфореус")}
                                >
                                    Амфореус
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="header-right">
                        <div className="d1">
                            <form onSubmit={this.searchClick}>
                                <input 
                                    placeholder={SearchText}
                                    disabled={searchDisabled}
                                    readOnly={searchDisabled}
                                />
                                <button type="submit">
                                    &#128269;
                                </button>
                            </form>
                        </div>
                        
                        <button 
                            className="menu-button" 
                            onClick={this.toggleMenu}
                        >
                            ☰
                        </button>
                        
                        {showMainMenu && (
                            <div className="dropdown-menu show">
                                <button 
                                    className="menu-item" 
                                    onClick={() => this.func_alert("Новости")}
                                >
                                    Новости
                                </button>
                                <button 
                                    className="menu-item" 
                                    onClick={() => this.func_alert("Режимы")}
                                >
                                    Режимы
                                </button>
                                <button 
                                    className="menu-item" 
                                    onClick={() => this.func_alert("Отряды")}
                                >
                                    Отряды
                                </button>
                            </div>
                        )}
                    </div>
                </header>

                <main className="main-content">
                    <h2>Вселенная Honkai: Star Rail</h2>
                    <p>
                        Это компьютерная ролевая игра с элементами гача, разработанная компанией miHoYo. 
                        Это первая пошаговая игра miHoYo. Сюжет повествует о главном герое, известном как 
                        Первопроходец, который путешествует между мирами на космическом поезде «Звёздный Экспресс», 
                        помогая различным цивилизациям и устраняя катастрофы, вызванные «Стелларонами» и другими силами. 
                        Это четвёртая часть серии Honkai (первые две части носили название Houkai), в которой используются 
                        новые персонажи наряду с альтернативными версиями существующих персонажей из Honkai Impact 3rd.
                    </p>

                    <div className="carousel-container">
                        <h2>Персонажи</h2>
                        
                        <div className="carousel">
                            <PhotoCart />
                        </div>
                    </div>
                </main>

                <footer>
                    <h4>Разработано студентами ВлГУ</h4>
                    <h4>группа ИТ-123</h4>
                    <h4>Сасюк Н.А.</h4>
                    <h4>Бодров И.А.</h4>
                    <h4>Савичева В.М.</h4>
                </footer>
            </div>
        );
    }
}