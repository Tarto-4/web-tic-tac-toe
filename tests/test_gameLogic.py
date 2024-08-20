import unittest
from gameLogic import check_winner

class TestGameLogic(unittest.TestCase):
    def test_winner_row(self):
        state = ['X', 'X', 'X', '', '', '', '', '', '']
        self.assertEqual(check_winner(state), 'X')

    def test_draw(self):
        state = ['X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', 'X']
        self.assertEqual(check_winner(state), 'Draw')

if __name__ == '__main__':
    unittest.main()

