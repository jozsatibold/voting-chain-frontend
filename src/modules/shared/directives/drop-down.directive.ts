import {
  ContentChild,
  Directive,
  ElementRef,
  forwardRef,
  HostBinding,
  HostListener,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges
} from "@angular/core";

@Directive({
  selector: "[appDropdownContent]"
})
export class DropDownContentDirective {
  @HostBinding("style.display")
  dropDownHideClass = "none";

  constructor(@Inject(forwardRef(() => DropDownDirective)) public dropdown) {}

  setOpen(open: boolean) {
    this.dropDownHideClass = open ? "block" : "none";
  }
}

@Directive({
  selector: "[appDropdownAnimatedContent]"
})
export class DropdownAnimatedContentDirective implements OnChanges {
  @HostBinding("style.max-height")
  dropDownHeightClass = "0";
  @HostBinding("style.border")
  dropDownBorderClass = "0";
  @Input()
  close: string;

  constructor(@Inject(forwardRef(() => DropDownDirective)) public dropdown) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.close && this.close) {
      this.dropdown.close();
    }
  }

  setOpen(open: boolean) {
    this.dropDownHeightClass = open ? "300px" : "0";
    this.dropDownBorderClass = open ? "1px solid #E5E5E5" : "0";
  }
}

@Directive({
  selector: "[appDropdownToggle]"
})
export class DropDownToggleDirective implements OnChanges {
  @HostBinding("style.cursor")
  cursorStyle = "pointer";
  @Input()
  open: string;

  constructor(
    @Inject(forwardRef(() => DropDownDirective)) public dropdown,
    private elementRef: ElementRef
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.open && this.open) {
      this.dropdown.open();
    }
  }

  isEventFrom($event) {
    return this.elementRef.nativeElement.contains($event.target);
  }
}

@Directive({
  selector: "[appActiveDropdownElement]"
})
export class ActiveDropDownElementDirective {
  @HostBinding("style.cursor")
  cursorStyle = "pointer";

  constructor(
    @Inject(forwardRef(() => DropDownDirective)) public dropdown,
    private elementRef: ElementRef
  ) {}

  isEventFrom($event) {
    return this.elementRef.nativeElement.contains($event.target);
  }
}

@Directive({
  selector: "[appClosingActiveDropdownElement]"
})
export class ClosingActiveDropDownElementDirective {
  @HostBinding("style.cursor")
  cursorStyle = "pointer";

  constructor(
    @Inject(forwardRef(() => DropDownDirective)) public dropdown,
    private elementRef: ElementRef
  ) {}

  isEventFrom($event) {
    return this.elementRef.nativeElement.contains($event.target);
  }
}

@Directive({
  selector: "[appCloseDropdown]"
})
export class CloseDropdownDirective {
  @HostListener("click", ["$event"])
  clickCheck($event) {
    this.dropdown.close();
  }

  constructor(@Inject(forwardRef(() => DropDownDirective)) public dropdown) {}
}

@Directive({
  selector: "[appDropDown]"
})
export class DropDownDirective implements OnDestroy {
  zoneSubscription: any;
  @ContentChild(DropDownContentDirective, { static: false })
  content: DropDownContentDirective;
  @ContentChild(DropdownAnimatedContentDirective, { static: false })
  animatedContent: DropdownAnimatedContentDirective;
  @ContentChild(DropDownToggleDirective, { static: false })
  toggle: DropDownToggleDirective;
  @ContentChild(ActiveDropDownElementDirective, { static: false })
  element: ActiveDropDownElementDirective;
  @ContentChild(CloseDropdownDirective, { static: false })
  closeButton: CloseDropdownDirective;
  @ContentChild(ClosingActiveDropDownElementDirective, { static: false })
  closingElement: ClosingActiveDropDownElementDirective;

  @HostBinding("class.open") activeClass = false;

  time = 0;
  isOpen = false;

  @HostListener("document:click", ["$event"])
  clickCheck($event) {
    if (this.isOpen) {
      if (
        !this.isEventFromElement($event) ||
        this.isEventFromClosingElement($event)
      ) {
        this.close();
      }
    } else {
      if (this.isEventFromToggle($event)) {
        this.open();
      }
    }
  }

  @HostListener("document:keyup.esc", ["$event"])
  keyupFunction() {
    this.close();
  }

  ngOnDestroy() {
    if (this.zoneSubscription) {
      this.zoneSubscription.unsubscribe();
    }
  }

  isToSoon() {
    const time = Date.now();
    const send = time - this.time > 200;
    this.time = time;
    return send;
  }

  open(): void {
    if (this.isToSoon()) {
      this.activeClass = true;
      // if events are to close together don't do them this maybe does not work
      if (!this.isOpen) {
        this.isOpen = true;
      }
      if (this.content) {
        this.content.setOpen(this.isOpen);
      }
      if (this.animatedContent) {
        this.animatedContent.setOpen(this.isOpen);
      }
    }
  }

  close(): void {
    if (this.isToSoon()) {
      this.activeClass = false;
      // if events are to close together don't do them this maybe does not work
      if (this.isOpen) {
        this.isOpen = false;
      }
      if (this.content) {
        this.content.setOpen(this.isOpen);
      }
      if (this.animatedContent) {
        this.animatedContent.setOpen(this.isOpen);
      }
    }
  }

  isEventFromToggle($event) {
    return this.toggle ? this.toggle.isEventFrom($event) : false;
  }

  isEventFromElement($event) {
    return this.element ? this.element.isEventFrom($event) : false;
  }

  isEventFromClosingElement($event) {
    return this.closingElement
      ? this.closingElement.isEventFrom($event)
      : false;
  }
}
