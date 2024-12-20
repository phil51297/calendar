import { HighlightDirective } from './highlight.directive';

describe('HighlightDirective', () => {
    it('should create an instance', () => {
        const elementRef = jasmine.createSpyObj('ElementRef', [
            'nativeElement',
        ]);
        const directive = new HighlightDirective(elementRef);
        expect(directive).toBeTruthy();
    });
});
