import NavBar from "./NavBar";
import React, {useState} from "react";
import axios from "axios";

export default function AddArticle() {

    const [values, setValues] = useState({
        title: '',
        description: '',
        article_content: '',
        image: ''
    })

    const [fieldsValid, setFieldsValid] = useState(false);
    const [invalidFields, setInvalidFields] = useState([]);
    const [loading, setLoading] = useState(true);

    const showEmptyFields = () => {
        console.log(fieldsValid)
        // Takes all the fields from the document
        const fields = [...document.querySelectorAll('input, select')];
        // For every field, if it is empty, adds the class "empty" to it. Otherwise, removes it
        const invalidFields = fields.filter(field => !verifyField(field)).map(field => field.id);
        setInvalidFields(invalidFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const activateModal = document.getElementById('activate-modal');
        activateModal.click();

        console.log(values)
        try {
            const response = await axios.post('/api/save-article',
                values,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

            console.log(response.data);
            setLoading(false);

        } catch (error) {
            switch (error.response.status) {
                case 422:
                    console.log('VALIDATION FAILED:', error.response.data.errors);
                    break;
                case 500:
                    console.log('UNKNOWN ERROR', error.response.data);
                    break;
            }
        }
    }

    const validationRules = {
        title: (value) => {
            const regex = /^[A-Za-zÀ-ÿ0-9\s.,:;!?'"()-]+$/;
            return regex.test(value);
        },
        description: (value) => {
            const regex = /^[A-Za-zÀ-ÿ0-9\s.,:;!?'"()-]+$/;
            return regex.test(value);
        },
        article_content: (value) => {
            const regex = /^[A-Za-zÀ-ÿ0-9\s.,:;!?'"()-]+$/;
            return regex.test(value);
        },
        image: (value) => {
            if (!value) return false;
            const allowedExtensions = ['.jpg', '.jpeg', '.png'];

            const fileExtension = value.toLowerCase().substring(value.lastIndexOf('.'));

            return allowedExtensions.includes(fileExtension);
        }
    };

    const verifyField = (field) => {
        if (field.value === '') return false;

        const validationRule = validationRules[field.id];

        return validationRule?.(field.value) ?? true;
    };

    const handleChange = (event) => {
        // Takes all the fields from the document and checks if they are all filled
        const allFieldsValid = [...document.querySelectorAll('input, select')]
            // For every field, stores in allFieldsValid true if the field is verified, false otherwise
            .every(field => {
                return verifyField(field);
            });

        // Sets the state to true if all fields are verified, false otherwise
        setFieldsValid(allFieldsValid);

        setValues({...values, [event.target.name]: event.target.value})
        console.log(values)
        console.log(fieldsValid)
    }

    const handleImageChange = (event) => {
        console.log(event.target.files[0])
        setValues({...values, image: event.target.files[0]})
    };

    return (
        <>
            <NavBar page={"addArticle"}/>

            <main className="container-xxl d-flex flex-column justify-content-center my-5">
                <div className="container text-center p-2 my-4" id="top">
                    <h1>Write Article</h1>
                </div>

                <form encType="multipart/form-data" className={"form-content pt-5 mx-auto tab-content"}>

                    <div className="form-input">
                        <label className={"form-label"} htmlFor="title">Title:</label>
                        <input className={`form-control ${invalidFields.includes('title') ? 'invalid-input' : ''}`} type="text" id="title" name="title" placeholder="A title for your article" value={values.title || ""} onChange={handleChange} required />
                        <br/>
                    </div>

                    <div className="form-input">
                        <label className={"form-label"} htmlFor="description">Description:</label>
                        <input className={`form-control ${invalidFields.includes('description') ? 'invalid-input' : ''}`} type="text" id="description" name="description" placeholder="A short description or summary of the article" value={values.description || ""} onChange={handleChange} required />
                        <br/>
                    </div>

                    <div className="form-input">
                        <label className={"form-label"} htmlFor="content">Content:</label>
                        <input className={`form-control ${invalidFields.includes('article_content') ? 'invalid-input' : ''}`} type="text" id="article_content" name="article_content" placeholder="Write here all the content of your article" value={values.article_content || ""} onChange={handleChange} required />
                        <br/>
                    </div>

                    <div className="form-input">
                        <label className={"form-label"} htmlFor="image">Image:</label>
                        <input className={`form-control ${invalidFields.includes('image') ? 'invalid-input' : ''}`} type="file" id="image" name="image" onChange={handleImageChange} required />
                        <br/>
                    </div>

                    <button className="btn form-button" onClick={fieldsValid ? handleSubmit : showEmptyFields}>
                        Register
                    </button>
                </form>

                <button id="activate-modal" hidden data-bs-toggle="modal" data-bs-target="#emailVerification"></button>

                <div className="modal fade" id="emailVerification" tabIndex="-1" aria-labelledby="emailVerificationLabel" aria-hidden="true">
                    <div className="modal-dialog mt-5">
                        <div className="modal-content email-confirmation-modal">
                            <div className="modal-header border-0">
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                    <i className="bi bi-x-lg"></i>
                                </button>
                            </div>
                            <div className="modal-body">
                                {loading ?
                                    <div className="Loading d-flex gap-3 align-items-center justify-content-center">
                                        <span>Saving article...</span>
                                        <div className="spinner-border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                    :
                                    <div className="container d-flex flex-column justify-content-center">
                                        <div className="container text-center p-2">
                                            <h1>Article saved!</h1>
                                        </div>

                                        {setTimeout(() => {
                                            window.location.href = "/#blog";
                                        }, 3000)}

                                        <div className="container text-center p-2 mt-2">
                                            <h3>Redirecting to the blog...</h3>
                                            <div className="spinner-border" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>

            </main>
        </>
    );
}
