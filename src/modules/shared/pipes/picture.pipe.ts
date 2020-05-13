import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({ name: "picture" })
export class PicturePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(src: string) {
    let validSrc = false;
    if (!!src && src !== "null" && src !== "undefined") {
      validSrc = true;
    }
    if (validSrc) {
      if (!(/^(http:\/\/)|(https:\/\/)(www.)?.*/.test(src))) {
        return src;
      }
      return this.sanitizer.bypassSecurityTrustUrl(src);
    } else {
      return "./assets/images/profile.png";
    }
  }
}
