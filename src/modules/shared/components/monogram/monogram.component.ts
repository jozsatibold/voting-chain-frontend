import {Component, Input} from "@angular/core";
import {User} from "@global/entities";

@Component({
  selector: "vc-monogram",
  templateUrl: "./monogram.component.html",
  styleUrls: ["./monogram.component.scss"]
})
export class MonogramComponent {
  size = 2;
  fontSize = "1.2em";
  monogram = "";

  color = "var(--text-color)";
  @Input() picture = "";
  @Input() fixFontSize;
  @Input() inactiveMode = false;

  @Input("color")
  set setColor(color) {
    this.color = color || 'var(--text-color)';
  }

  @Input("size")
  set setSize(size: number) {
    this.size = size;
    this.fontSize = this.fixFontSize
      ? this.fixFontSize
      : `${(size / 1.7).toFixed(2)}em`;
  }

  @Input("data")
  set setData(data: User) {
    if (data) {
      this.picture = data.picture || "";
      if (data.name) {
        this.setUsername = data.name;
      } else {
        this.monogram = "--";
      }
      if ((data.role && data.role === "admin") && this.color === "#2c4048") {
        this.color = "var(--secondary-color)";
      }
    } else {
      this.picture = "";
      this.monogram = "--";
    }
  }

  @Input("name")
  set setUsername(name: string) {
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
