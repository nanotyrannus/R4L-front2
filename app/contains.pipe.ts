import { Pipe, PipeTransform } from "@angular/core"

@Pipe({ name: "contains" })
export class ContainsPipe implements PipeTransform {
    transform(value: any, query: string): boolean {
        if(!query) return true
        if (value.toLowerCase().indexOf(query.toLowerCase()) < 0) {
            return false
        } else {
            return true
        }
    }
}