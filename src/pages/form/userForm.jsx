import React from 'react'
import Inputlabel from '../../components/form/inputlabel'

export default function UserForm({handleSubmit, handleChange, user, showBtn, showPassword}) {
    return (
        <>
            <form id="userForm" onSubmit={handleSubmit} className="mb-5">
                <fieldset> 
                    <div className="form-group">
                        <label htmlFor="gender">Civilité</label>
                        <div className="custom-control custom-radio">
                            <input type="radio" id="customRadio1" name="gender" className="custom-control-input" onChange={handleChange} value="H"/>
                            <label className="custom-control-label" htmlFor="customRadio1">Homme</label>
                        </div>
                        <div className="custom-control custom-radio">
                            <input type="radio" id="customRadio2" name="gender" className="custom-control-input" onChange={handleChange} value="F"/>
                            <label className="custom-control-label" htmlFor="customRadio2">Femme</label>
                        </div>      
                    </div>
                </fieldset>
                <Inputlabel type="text" label="Nom" name="lastname" value={user.lastname}
                    placeholder="Veuillez saisir un nom" change={handleChange} />

                <Inputlabel type="text" label="Prenom" name="firstname" value={user.firstname}
                    placeholder="Veuillez saisir un prenom" change={handleChange} />

                <Inputlabel type="email" label="Email" name="email" value={user.email}
                    placeholder="Veuillez saisir un email" change={handleChange} />

                {showPassword && <Inputlabel type="password" label="Mot de passe" name="password" value={user.password}
                    placeholder="Veuillez saisir un mot de passe" change={handleChange} />}

                <Inputlabel type="tel" label="Tél" name="phone" value={user.phone}
                    placeholder="Veuillez saisir un numéro de téléphone" change={handleChange} />

                <Inputlabel type="text" label="Pays" name="country" value={user.address?.country}
                    placeholder="Veuillez saisir un pays" change={handleChange} />

                <Inputlabel type="text" label="Ville" name="city" value={user.address?.city}
                    placeholder="Veuillez saisir une ville" change={handleChange} />

                <Inputlabel type="text" label="N°" name="num" value={user.address?.num}
                    placeholder="Veuillez saisir un n°" change={handleChange} />

                <Inputlabel type="text" label="Rue" name="street" value={user.address?.street}
                    placeholder="Veuillez saisir une rue" change={handleChange} />

                <Inputlabel type="text" label="Code postale" name="postalCode" value={user.address?.postalCode}
                    placeholder="Veuillez saisir un code postal" change={handleChange} />

                {showBtn && <button className="btn btn-primary form-control" type="submit">Enregistrer</button>}
            </form>
        </>
    )
}
