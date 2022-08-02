import { React } from "react";
import './styles.css'
export const LoaderColored = () => {
    return(
        <div class="spinner">
            Loading
            <div class="spinner-sector spinner-sector-red"></div>
            <div class="spinner-sector spinner-sector-blue"></div>
            <div class="spinner-sector spinner-sector-green"></div>
        </div>
    )
}