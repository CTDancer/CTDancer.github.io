"""Regression tests for color-only equation emphasis and future notes."""
import unittest
from pathlib import Path
from prepare_note import normalize_emphasis, prepare


class EquationStyle(unittest.TestCase):
    def test_nested_braces_and_tags(self):
        tex = r"\boxed{\frac{a_{i}}{b}+\hat H}\tag{2}"
        result, emphasis = normalize_emphasis(tex)
        self.assertTrue(emphasis)
        self.assertEqual(result, r"{\frac{a_{i}}{b}+\hat H}\tag{2}")

    def test_aligned_and_nested_box(self):
        tex = r"\boxed{\begin{aligned}a&=\boxed{x}\\b&=y\end{aligned}}\tag{1}"
        result, emphasis = normalize_emphasis(tex)
        self.assertTrue(emphasis)
        self.assertEqual(result, r"{\begin{aligned}a&={x}\\b&=y\end{aligned}}\tag{1}")

    def test_explicit_green_matches_box(self):
        self.assertEqual(normalize_emphasis(r"\textcolor{#306c53}{x}"),
                         normalize_emphasis(r"\boxed{x}"))

    def test_other_commands_and_escaped_backslashes(self):
        for tex in (r"\boxedness{x}", r"\\boxed{x}", r"\textcolor{red}{x}", r"x+y"):
            self.assertEqual(normalize_emphasis(tex), (tex, False))

    def test_code_and_math_separated(self):
        source = r"$\boxed{x}$" + "\n\n" + chr(96) + r"$\boxed{literal}$" + chr(96)
        generated, eq = prepare(source)
        self.assertEqual(eq, [(False, "{x}", True)])
        self.assertIn('class="note-math-inline note-math-emphasis"', generated)
        self.assertIn(r"$\boxed{literal}$", generated)

    def test_all_committed_sources(self):
        for source in Path(".github/note_sources").rglob("*.md"):
            with self.subTest(source=source):
                relative = source.relative_to(".github/note_sources")
                destination = Path("_notes") / relative
                generated, equations = prepare(source.read_text(encoding="utf-8"))
                self.assertEqual(generated, destination.read_text(encoding="utf-8"))
                for _, tex, _ in equations:
                    self.assertFalse(normalize_emphasis(tex)[1])


if __name__ == "__main__":
    unittest.main()
