import { Component, Input } from "@angular/core";

@Component({
  selector: "vc-monogram",
  templateUrl: "./monogram.component.html",
  styleUrls: ["./monogram.component.scss"]
})
export class MonogramComponent {
  size = 2;
  fontSize = "1.2em";
  monogram = "";

  color = "#000000";
  @Input() picture = "";
  @Input() fixFontSize;
  @Input() inactiveMode = false;

  @Input("color")
  set setColor(color) {
    this.color = color || "#000000";
  }

  @Input("size")
  set setSize(size: number) {
    this.size = size;
    this.fontSize = this.fixFontSize
      ? this.fixFontSize
      : `${(size / 1.7).toFixed(2)}em`;
  }

  @Input("data")
  set setData(data: {
    name?: string;
    firstName?: string;
    lastName?: string;
    picture?: string;
    profileImg?: string;
    monogram?: string;
    avatar?: string;
    type?: "user" | "admin";
    role?: "user" | "admin";
  }) {
    if (data) {
      this.picture = data.picture || data.avatar || data.profileImg || "";
      if (data.name) {
        this.setUsername = data.name;
      } else if (data.firstName && data.lastName) {
        this.monogram = `${data.firstName[0]}${data.lastName[0]}`.toUpperCase();
      } else if (data.monogram) {
        this.monogram = data.monogram.toUpperCase();
      } else {
        this.monogram = "--";
      }
      if (
        ((data.type && data.type === "admin") ||
          (data.role && data.role === "admin")) &&
        this.color === "#2c4048"
      ) {
        this.color = "#3e535b";
      }
    } else {
      this.picture = "";
      this.monogram = "--";
    }
  }

  @Input("name")
  set setUsername(name: string | { firstName: string; lastName: string }) {
    if (name instanceof Object) {
      this.monogram = `${name.firstName[0]}${name.lastName[0]}`.toUpperCase();
    } else {
      const parts = (name || "").split(" ").filter(part => !!part);
      if (parts.length > 1) {
        this.monogram = `${parts[0][0]}${parts[1][0]}`.toUpperCase();
      } else if (parts.length === 1) {
        this.monogram = `${parts[0][0]}${parts[0][1]}`.toUpperCase();
      } else {
        this.monogram = "--";
      }
    }
  }
}
