
export default function VerifyEmail() {

    return (

        <>
            <main className="container d-flex flex-column justify-content-center">
                <div className="container text-center p-2">
                    <h1>Email sent</h1>
                </div>

                <div className="container text-center p-2 mt-2">
                    <h3>We have sent you an email with a link to confirm your account</h3>
                    <div className="m-4 verify-email-link nav-button">
                        <h2>
                            <a href="https://gmail.com">Click the clicky thing!</a>
                        </h2>
                    </div>
                </div>
            </main>
        </>
    );
}
