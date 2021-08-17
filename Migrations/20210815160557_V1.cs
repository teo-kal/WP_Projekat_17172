using Microsoft.EntityFrameworkCore.Migrations;

namespace WebProjekat17172.Migrations
{
    public partial class V1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Ambulanta",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(25)", maxLength: 25, nullable: true),
                    PocetakRada = table.Column<int>(type: "int", nullable: false),
                    BrojSati = table.Column<int>(type: "int", nullable: false),
                    BrojTerminaPoSatu = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ambulanta", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Ljubimac",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    JMBGVlasnika = table.Column<string>(type: "nvarchar(13)", maxLength: 13, nullable: true),
                    Ime = table.Column<string>(type: "nvarchar(25)", maxLength: 25, nullable: true),
                    Vrsta = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DatumRodjenja = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Pol = table.Column<string>(type: "nvarchar(1)", nullable: false),
                    BrojCipa = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ljubimac", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Veterinar",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(type: "nvarchar(25)", maxLength: 25, nullable: true),
                    Prezime = table.Column<string>(type: "nvarchar(25)", maxLength: 25, nullable: true),
                    DatumRodjenja = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Pol = table.Column<string>(type: "nvarchar(1)", nullable: false),
                    StrucnaSprema = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    PutanjaDoSlike = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AmbulantaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Veterinar", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Veterinar_Ambulanta_AmbulantaID",
                        column: x => x.AmbulantaID,
                        principalTable: "Ambulanta",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Termin",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Sati = table.Column<int>(type: "int", nullable: false),
                    Minuti = table.Column<int>(type: "int", nullable: false),
                    AmbulantaID = table.Column<int>(type: "int", nullable: true),
                    VeterinarID = table.Column<int>(type: "int", nullable: true),
                    LjubimacID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Termin", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Termin_Ambulanta_AmbulantaID",
                        column: x => x.AmbulantaID,
                        principalTable: "Ambulanta",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Termin_Ljubimac_LjubimacID",
                        column: x => x.LjubimacID,
                        principalTable: "Ljubimac",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Termin_Veterinar_VeterinarID",
                        column: x => x.VeterinarID,
                        principalTable: "Veterinar",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Termin_AmbulantaID",
                table: "Termin",
                column: "AmbulantaID");

            migrationBuilder.CreateIndex(
                name: "IX_Termin_LjubimacID",
                table: "Termin",
                column: "LjubimacID");

            migrationBuilder.CreateIndex(
                name: "IX_Termin_VeterinarID",
                table: "Termin",
                column: "VeterinarID");

            migrationBuilder.CreateIndex(
                name: "IX_Veterinar_AmbulantaID",
                table: "Veterinar",
                column: "AmbulantaID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Termin");

            migrationBuilder.DropTable(
                name: "Ljubimac");

            migrationBuilder.DropTable(
                name: "Veterinar");

            migrationBuilder.DropTable(
                name: "Ambulanta");
        }
    }
}
