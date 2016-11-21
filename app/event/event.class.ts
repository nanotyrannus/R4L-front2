export class Event {
    
    constructor(private _name: string, 
                private _description: string,
                private _thumbnail: string,
                private _sites: number,
                private _id: number,
                private _boundingBox: any,
                private _startDate: string,
                private _endDate: string) {
    }

    get name(): string {
        return this._name
    }

    get description(): string {
        return this._description
    }

    get thumbnail(): string {
        return this._thumbnail
    }

    get sites(): number {
        return this._sites
    }

    get id(): number {
        return this._id
    }

    get boundingBox():any {
        return this._boundingBox
    }

    get startDate(): string {
        return this._startDate
    }

    get endDate(): string {
        return this._endDate
    }
}