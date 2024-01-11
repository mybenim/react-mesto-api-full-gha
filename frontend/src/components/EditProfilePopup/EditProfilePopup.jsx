import { useContext, useEffect } from "react";
import useFormValidation from "../../utils/useFormValidation.js";
import PopupWithForm from "../PopupWithForm/PopupWithForm.jsx";
import CurrentUserContext from "../../context/CurrentUserContext.js"

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
    const currentUser = useContext(CurrentUserContext)
    const { values, errors, isValid, isInputValid, handleChange, reset, setValue } = useFormValidation()

    useEffect(() => {
    if (!isOpen) {
        setValue("fullname", currentUser.name);
        setValue("job", currentUser.about);
    }
    }, [isOpen, currentUser, setValue]);

    function handleSubmit(event) {
        event.preventDefault();
        onUpdateUser({ fullname: values.fullname, job: values.job }, reset);
    }

    function resetClose() {
        onClose()
        reset({ fullname: currentUser.name, job: currentUser.about })
    }

    return (
        <PopupWithForm 
            name="edit profile"
            title="Редактировать профиль"
            isOpen = {isOpen}
            onClose = {resetClose}
            isValid = {isValid}
            onSubmit = {handleSubmit}
            titleButton={isLoading ? "Сохранение..." : "Сохранить"}
            >
            <input
                type="text"
                id="name-profile"
                className={`popup__input popup__input_ctrl_fullname ${isInputValid.fullname === undefined || isInputValid.fullname ? "" : "popup__input_error"}`}
                name="fullname"
                placeholder="Как вас зовут"
                required
                minLength={2}
                maxLength={40}
                value = {values.fullname ? values.fullname : ""}
                onChange={handleChange}
            />
                <span id="name-profile-error" className="popup__input-error">{errors.fullname}</span>
            
            <input
                type="text"
                id="about-profile"
                className={`popup__input popup__input_ctrl_job ${isInputValid.job === undefined || isInputValid.job ? "" : "popup__input_error"}`}
                name="job"
                placeholder="О себе"
                required=""
                minLength={2}
                maxLength={200}
                value = {values.job ? values.job : ""}
                onChange={handleChange}
            />
                <span id="about-profile-error" className="popup__input-error">{errors.job}</span>
    </PopupWithForm>
    )
}