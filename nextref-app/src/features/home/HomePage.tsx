import { useNavigate } from 'react-router-dom';
import { Button } from '../../shared/components/Button/button.component';
import './HomePage.css';

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <div className="homeContainer">
            <h2 className="homeTitle">Bienvenue sur NextRef</h2>
            <div className="homeDescription">
                NextRef est une application permettant de lister des contenus (livres, articles, vidéos, etc.), et de consigner les références de ces contenus entre eux (citations, recommandations, lien, etc.). <br/>
                Le but étant de créer un écosysteme de connaissances et d'oeuvres, et de découvrir d'autres oeuvres partageant des références communes avec celles que vous avez déjà consultées.<br/>
                Il est possible de créer des collections de contenus et de voir quels sont les autres contenus qui pourraient vous intéresser en se basant sur l'ensemble des références de cette collection.<br/>
                Dans le futur, il sera possible de consulter ses collections sous forme de map/graphe (mind map, nuages de points), et de naviguer dans les contenus en suivant les références entre eux.<br/>
            </div>
            <div className="homeButtons">
                <Button onClick={() => navigate('/contents')}>Gérer les contenus</Button>
                <Button onClick={() => navigate('/collections')}>Gérer mes collections</Button>
            </div>
        </div>
    );
}