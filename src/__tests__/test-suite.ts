import { applyBasicMarkdownFormatting } from "../markdown/service/markdown.service"
import { boldTestFixture, foodFactTestFixture, lineWidthTestFixture, replacementPairTestFixture } from "./fixtures/test-fixtures"

test('Test bold formatting', async () => {
    return applyBasicMarkdownFormatting(boldTestFixture).then(data => {
        expect(data).toBe('Lorem ipsum **dolor** sit **amet**');
    });
})

test('Test replacement pairs', async () => {
    return applyBasicMarkdownFormatting(replacementPairTestFixture).then(data => {
        expect(data).toBe('Lorem IPSUM dolor malesuada nunc amet');
    });
})

test('Chuk Norris fact test', async () => {
    return applyBasicMarkdownFormatting(foodFactTestFixture).then(data => {
        expect(data).toContain('Lorem ipsum dolor sit amet');
        expect(data).toContain('Chuck Norris');
    });
})

test('Line width test', async () => {
    return applyBasicMarkdownFormatting(lineWidthTestFixture).then(data => {
        expect(data).toBe('Lorem\n ipsu\nm dol\nor si\nt ame\nt');
    });
})