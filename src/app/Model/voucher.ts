export interface Voucher{
    key: string
    price: number
    isValid:boolean
    createdBy:number
    validDate?: Date
}