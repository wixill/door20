import { useEffect, useRef, useState } from "react";
import "../styles/pdf.less";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

function PdfPage({ onPageLoad }) {
    const pdfImages = useRef(
        Object.keys(
            import.meta.glob(
                "/public/assets/pdf_images/bloomburrow_player_guide/*"
            )
        ).sort((a, b) => {
            const aNum = Number(a.split("page_")[1].split(".")[0]);
            const bNum = Number(b.split("page_")[1].split(".")[0]);
            return aNum - bNum;
        })
    );

    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        onPageLoad();
    }, []);

    return (
        <div className="page-pdf">
            <img
                className="pdf-image"
                src={pdfImages.current[currentImage].replace("/public", "")}
            />
            <button
                onClick={() => setCurrentImage(currentImage + 1)}
                className="pdf-next-button"
                disabled={currentImage === pdfImages.current.length - 1}
            >
                <NavigateNextIcon />
            </button>
            <button
                onClick={() => setCurrentImage(currentImage - 1)}
                className="pdf-prev-button"
                disabled={currentImage === 0}
            >
                <NavigateBeforeIcon />
            </button>
        </div>
    );
}

export default PdfPage;
