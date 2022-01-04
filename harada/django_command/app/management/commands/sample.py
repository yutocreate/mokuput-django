from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = 'ユーザー情報を表示するバッチです'

    def add_arguments(self, parser):
        parser.add_argument('name', type=str, help='名前')
        parser.add_argument('age', type=int, help='年齢')
        parser.add_argument('three_words', nargs=3, help='好きな言葉３つ')
        parser.add_argument('blood_type', choices=[
                            'A', 'B', 'O', 'AB'], help='血液型')
        parser.add_argument(
            '--birthday', default='1900-01-01', help='誕生日(例：2000-01-01)')
        parser.add_argument('--active', action='store_true', help='アクティブ状態')

    def handle(self, *args, **options):
        name = options['name']
        age = options['age']
        three_words = options['three_words']
        birthday = options['birthday']
        blood_type = f"{options['blood_type']}型"
        active = options['active']
        print(
            f'name = {name}, age = {age}, three_words = {three_words}, birthday = {birthday}, blood_type = {blood_type}, active = {active}'
        )
