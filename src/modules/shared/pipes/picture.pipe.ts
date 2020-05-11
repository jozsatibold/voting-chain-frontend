import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({ name: "picture" })
export class PicturePipe implements PipeTransform {
  public static PICTURE_USER = "default";
  public static PICTURE_UNSAFE_USER = "base";

  constructor(private sanitizer: DomSanitizer) {}

  transform(src: string, type: string = "base") {
    let validSrc = false;
    if (src && src !== "null" && src !== "undefined") {
      validSrc = true;
    }
    if (validSrc) {
      if (type === PicturePipe.PICTURE_UNSAFE_USER) {
        return src;
      }
      return this.sanitizer.bypassSecurityTrustUrl(src);
    } else {
      return "./assets/images/profile-img.png";
    }
  }
}
