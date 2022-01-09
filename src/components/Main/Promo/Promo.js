import './Promo.css'

function Promo() {
    return <div className='promo'>
        <h1 className='promo__header'>
        Учебный проект студента факультета Веб-разработки.
        </h1>
        <nav className='promo__nav'>
            <ul className='promo__nav-list'>
                <li className='promo__list-el'><button className='promo__nav-button'>О проекте</button></li>
                <li className='promo__list-el'><button className='promo__nav-button'>Технологии</button></li>
                <li className='promo__list-el'><button className='promo__nav-button'>Студент</button></li>
            </ul>
        </nav>
        </div>
}

export default Promo;