import React, { useMemo } from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router';
import { useForm } from '../../hooks/useForm';
import { HeroCard } from '../heroes/HeroCard';
import { getHeroByName } from '../../selectors/getHeroesByName';

export const SearchScreen = ({ history }) => {

    const location = useLocation();
    const { q = '' } = queryString.parse(location.search);

    const [formValues, handleInputChange] = useForm({
        superhero: q
    });

    const { superhero } = formValues;

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push(`?q=${superhero}`);
    }

    const heroesFiltered = useMemo(() => getHeroByName(q), [q]);

    return (
        <div>
            <h1>SearchScreen</h1>
            <hr />
            <div className='row'>
                <div className='col-md-5'>
                    <h4>Search Form</h4>
                    <hr />

                    <form onSubmit={handleSubmit}>
                        <input
                            type='text'
                            placeholder='Find your hero'
                            className='form-control'
                            name='superhero'
                            autoComplete='off'
                            value={superhero}
                            onChange={handleInputChange}
                        />
                        <button
                            type='submit'
                            className='btn m-1 btn-block btn-outline-primary'
                        >
                            Search...
                        </button>
                    </form>
                </div>
                <div className='col-md-7'>
                    <h4>Results</h4>
                    <hr />

                    {(q === '') &&
                        <div className='alert alert-info'>
                            Search a hero
                        </div>
                    }

                    {(q !== '' && heroesFiltered.length === 0) &&
                        <div className='alert alert-danger'>
                            {q} Not Found
                        </div>
                    }

                    {
                        heroesFiltered.map(hero => (
                            <HeroCard
                                key={hero.id}
                                {...hero}
                            />
                        ))
                    }

                </div>
            </div>
        </div>
    )
}
