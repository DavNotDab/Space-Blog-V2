import NavBar from "./NavBar";

export default function About() {

    return (
        <>
            <NavBar page={'about'}/>

            <main className="container d-flex flex-column justify-content-center my-5">

                <div className="container text-center p-2 mt-3">
                    <h1>ABOUT</h1>
                </div>

                <div className="container-sm row mx-auto justify-content-between align-items-center">
                    <div className="col-md-5 d-flex flex-column justify-content-center">
                        <h3 className="about-heading mb-3 fs-5">About Space Blog</h3>
                        <div className="about-content">
                            <p>This is a project born from a space geek wanting to share with the world how beautiful
                                Space is.</p>
                            <p>
                                My name is David, I’ve been fan of Space and the universe from childhood.
                                I could talk about these things for hours, and I’m so passionate about it that I don’t
                                even notice.
                                I think people should know more about Space and the universe, and that’s why I created
                                this blog.
                            </p>
                            <p>
                                People, and especially teenagers nowadays are so focused on their phones and social
                                media that they
                                don’t even notice the beauty of the world around them. I want to change that.
                            </p>
                            <p>
                                Check out our social media to keep up to date!
                            </p>
                            <div className="social-media d-flex justify-content-center gap-4 fs-3">
                                <i className="bi bi-instagram"></i>
                                <i className="bi bi-twitter"></i>
                                <i className="bi bi-facebook"></i>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5 d-flex flex-column justify-content-center">
                        <h3 className="contact-heading mb-3 fs-5">Contact us</h3>
                        <form>
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="contact-name">Name</label>
                                <input type="text" id="contact-name" className="form-control"/>
                            </div>

                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="contact-email">Email address</label>
                                <input type="email" id="contact-email" className="form-control"/>
                            </div>

                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="contact-message">Message</label>
                                <textarea className="form-control" id="contact-message" rows="4"></textarea>
                            </div>

                            <button type="submit" className="btn btn-primary btn-block contact-submit">Send</button>
                        </form>
                    </div>
                </div>

            </main>
        </>
    );
}
