import React from 'react';
import EventEmitter from "events";
import {toast} from "react-toastify";

type Severity = "info" | "warn" | "success" | "error";

interface Notification {
    on(event: Severity, listener: (message: React.ReactElement | string, customTitle?: string) => void);
    emit(event: Severity, message: React.ReactElement | string | object, customTitle?: string);
    on(event: string, listener?: (...args: any[]) => any);
}
class Notification extends EventEmitter {

    lifetime: number = 2000; // ms
    titles: { [k in Severity]: string } = {
        warn: 'Attention !',
        error: 'Erreur !',
        info: 'Information',
        success: 'Succès !'
    };

    constructor() {
        super();

        Object.entries(this.titles).forEach(([key, value]) => {
            this.on(key, (message, position: `${"top" | "bottom"}-${"right" | "left" | "center"}` = "bottom-right") => {
                toast[key](message, {
                    position,
                    theme: "colored",
                    draggable: true,
                    draggablePercent: 60,
                    autoClose: key === "error" || "info" ? this.lifetime + 3000 : this.lifetime,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                })
            })
        })
    }

}

export const notification = new Notification();
