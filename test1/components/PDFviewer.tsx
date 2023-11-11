// Copyright (c) 2022-present InstantApp Solutions. All Rights Reserved.
import { IonButton, IonSpinner } from "@ionic/react";
import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

interface PDFViewerInterface {
  file: Blob;
}

interface DocumentLoadEvent {
  numPages: number;
}

// Custom Hook
function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowWidth;
}

export const PDFViewer: React.FC<PDFViewerInterface> = ({ file }) => {
  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  }, []);
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const windowWidth = useWindowWidth();
  const [scale, setScale] = useState(windowWidth < 768 ? 0.5 : 1);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const onDocumentLoadSuccess = ({ numPages }: DocumentLoadEvent) => {
    console.log("onDocumentLoadSuccess");
    setNumPages(numPages);
    setLoading(false);
  };

  const changePage = (offset: number) => {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  };

  const previousPage = () => {
    changePage(-1);
  };

  const nextPage = () => {
    changePage(1);
  };

  const zoomIn = () => {
    setScale((prevScale) => prevScale + 0.1);
  };

  const zoomOut = () => {
    setScale((prevScale) => prevScale - 0.1);
  };

  return (
    <div>
      {loading && <IonSpinner />}
      {!loading && error && <div>Error while loading document</div>}
      <>
        <div>
          <IonButton disabled={pageNumber <= 1} onClick={previousPage}>
            Previous
          </IonButton>
          <IonButton disabled={pageNumber >= numPages} onClick={nextPage}>
            Next
          </IonButton>
          <IonButton onClick={zoomIn}>Zoom In</IonButton>
          <IonButton onClick={zoomOut}>Zoom Out</IonButton>
        </div>
        <div>
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={() => setError(true)}
            loading={""}
          >
            <Page pageNumber={pageNumber} scale={scale} />
          </Document>
        </div>
        <p>
          Page {pageNumber} of {numPages}
        </p>
      </>
    </div>
  );
};
