import { start } from "repl"
import { create, Whatsapp, Message, SocketState } from "venom-bot"

export type QRCode = {
    base64Qr: string
    asciiQR: string
    attempts: number
    urlCode?: string
}

class Sender {
    private client: Whatsapp
    private connected: boolean
    private qr: QRCode

    get isConnected() : boolean {
        return this.connected
    }

    get qrCode(): QRCode {
        return this.qr
    }

    constructor(){
        this.initialize()
    }

    async sendImage(numero: string, path: string){
        await this.client.sendImage(numero, path)
    }

    private initialize() {
        const qr = (base64Qr: string, asciiQR:string, attempts: number, urlCode?: string) => {
            this.qr = {base64Qr, asciiQR, attempts, urlCode}
        }

        const status = (statusSession: string) => {
      // return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken || 
      // chatsAvailable || deviceNotConnected || serverWssNotConnected || noOpenBrowser || initBrowser || openBrowser || connectBrowserWs || 
      // initWhatsapp || erroPageWhatsapp || successPageWhatsapp || waitForLogin || waitChat || successChat
      // Create session wss return "serverClose" case server for close
            this.connected = ["isLogged", "qrReadSucess", "chatsAvailable"].includes(statusSession)
        }

        const start = (client: Whatsapp) => {
            this.client = client

            client.onStateChange((state) => {
                this.connected = state === SocketState.CONNECTED
            })

        }
         
        create('Zootech',qr)
            .then((client) => start(client))
            .catch((error) => console.error(error))
    }
}

export default Sender