import NavBar from "./NavBar";
import React, {useLayoutEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

export default function EditArticle() {

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const [article, setArticle] = useState({});

    const [values, setValues] = useState({
        id: '',
        title: '',
        description: '',
        article_content: '',
        image: ''
    })

    const params = useParams();
    const id = params.id;

    const getArticle = async () => {
        if (id) {
            try {
                const response = await axios.get(`/api/get-article/${id}`);
                console.log(response.data)
                setArticle(response.data);
                setValues({
                    id: response.data.id,
                    title: response.data.title,
                    description: response.data.description,
                    article_content: response.data.content
                })
            } catch (error) {
                console.log(error);
            }
        }
    }

    const showEmptyFields = () => {
        const fields = [...document.querySelectorAll('input, select')];
        const fieldErrors = {};

        // For every field, if it is empty, adds the class "empty" to it. Otherwise, removes it
        fields.forEach(field => {
            if (!verifyField(field)) {
                switch (field.id) {
                    case 'title':
                        field.value.length < 3 ?
                            fieldErrors[field.id] = ['Minimum length is three characters.'] :
                            fieldErrors[field.id] = ['No special characters are allowed.'];
                        break;
                    case 'description':
                        field.value.length < 10 ?
                            fieldErrors[field.id] = ['Minimum length is ten characters.'] :
                            fieldErrors[field.id] = ['No special characters are allowed.'];
                        break;
                    case 'article_content':
                        field.value.length < 100 ?
                            fieldErrors[field.id] = ['Minimum length is a hundred characters.'] :
                            fieldErrors[field.id] = ['No special characters are allowed.'];
                        break;
                    case 'image':
                        fieldErrors[field.id] = ['Only .jpg, .jpeg, .png and .webp files are allowed.'];
                        break;
                    default:
                        fieldErrors[field.id] = ['Please fill this field.'];
                        break;
                }
            }
        });

        setErrors(fieldErrors);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const activateModal = document.getElementById('activate-modal');
        activateModal.click();

        console.log(values)
        try {
            const response = await axios.post('/api/update-article',
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
            const regex = /^[A-Za-zÀ-ÿ0-9\s.,:;!?'"`()\-$€&]{3,}$/;
            return regex.test(value);
        },
        description: (value) => {
            const regex = /^[A-Za-zÀ-ÿ0-9\s.,:;!?'"`()\-_—+ºª\/#$€&\\<>\[\]{}]{10,}$/;
            return regex.test(value);
        },
        article_content: (value) => {
            const regex = /^[A-Za-zÀ-ÿ0-9\s.,:;!?'"`()\-_—+ºª\/#$€&\\<>\[\]{}]{100,}$/;
            return regex.test(value);
        },
        image: (value) => {
            if (!value) return false;
            const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

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
        const field = event.target;
        const fieldErrors = { ...errors };

        if (verifyField(field)) {
            delete fieldErrors[field.id];
        } else {
            switch (field.id) {
                case 'title':
                    field.value.length < 3 ?
                        fieldErrors[field.id] = ['Minimum length is three characters.'] :
                        fieldErrors[field.id] = ['No special characters are allowed.'];
                    break;
                case 'description':
                    field.value.length < 10 ?
                        fieldErrors[field.id] = ['Minimum length is ten characters.'] :
                        fieldErrors[field.id] = ['No special characters are allowed.'];
                    break;
                case 'article_content':
                    field.value.length < 100 ?
                        fieldErrors[field.id] = ['Minimum length is a hundred characters.'] :
                        fieldErrors[field.id] = ['No special characters are allowed.'];
                    break;
                case 'image':
                    fieldErrors[field.id] = ['Only .jpg, .jpeg, .png and .webp files are allowed.'];
                    break;
                default:
                    fieldErrors[field.id] = ['Please fill this field.'];
                    break;
            }
        }

        setErrors(fieldErrors);

        setValues((previousValues) => ({
            ...previousValues,
            [field.name]: field.value
        }));
    }

    const handleImageChange = (event) => {
        console.log(event.target.files[0])
        setValues({...values, image: event.target.files[0]})
    };

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
        getArticle();
        console.log(article)
    }, []);

    return (
        <>
            <NavBar page={"addArticle"}/>

            <main className="container-xxl d-flex flex-column justify-content-center my-5">
                <div className="container text-center p-2 my-4" id="top">
                    <h1>Edit Article</h1>
                </div>

                <form onSubmit={Object.keys(errors).length === 0 ? handleSubmit : showEmptyFields} encType="multipart/form-data" className={"form-content pt-5"}>

                    <div className="form-input">
                        <label className={"form-label"} htmlFor="title">Title:</label>
                        <input className={`form-control ${errors.title ? 'invalid-input' : ''}`}
                               type="text" id="title" name="title" placeholder="A title for your article"
                               value={values.title || ""} onChange={handleChange} required />
                        {errors.title && <p className="error-message">{errors.title[0]}</p>}
                        <br/>
                    </div>

                    <div className="form-input">
                        <label className={"form-label"} htmlFor="description">Description:</label>
                        <textarea className={`form-control ${errors.description ? 'invalid-input' : ''}`}
                                  id="description" name="description" placeholder="A short description or summary of the article"
                                  onChange={handleChange} rows={3} required defaultValue={values.description || ""}>
                        </textarea>
                        {errors.description && <p className="error-message">{errors.description[0]}</p>}
                        <br/>
                    </div>

                    <div className="form-input">
                        <label className={"form-label"} htmlFor="content">Content:</label>
                        <textarea className={`form-control ${errors.article_content ? 'invalid-input' : ''}`}
                                  id="article_content" name="article_content" placeholder="Write here all the content of your article"
                                  onChange={handleChange} rows={20} required defaultValue={values.article_content || ""}>
                        </textarea>
                        {errors.article_content && <p className="error-message">{errors.article_content[0]}</p>}
                        <br/>
                    </div>

                    <div className="form-input">
                        <label className={"form-label"} htmlFor="image">Image:</label>
                        <input className={`form-control ${errors.image ? 'invalid-input' : ''}`}
                               type="file" id="image" name="image" onChange={handleImageChange} required />
                        {errors.image && <p className="error-message">{errors.image[0]}</p>}
                        <br/>
                    </div>

                    <button className="btn form-button">
                        Submit
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

                                        <span hidden>
                                            { setTimeout(() => {
                                            window.location.href = "/#blog";
                                        }, 2000)}
                                        </span>

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
