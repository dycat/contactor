import { TableBuilder } from "./Database/TableBuilder";

export class PersonalDetailsTableBuilder {
    public Build(): TableBuilder {
        const tableBuilder = new TableBuilder();
        tableBuilder
        .WithDatabase("contactor")
        .WithTableName("people")
        .WithPrimaryField("PersonId")
        .WithIndexName("personId")
        .WithVersion(1);
        return tableBuilder;
    }
}