
export default function Layout() {

        return (
            <div className="background">
                <video autoPlay muted loop preload="auto" id="backgroundVideo">
                    <source src="/assets/video/bgVideo-bait.mp4" type="video/mp4"/>
                </video>
            </div>
        );
}
