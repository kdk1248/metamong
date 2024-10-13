# NULL 문자를 제거하는 스크립트
input_file = 'C:/Users/user/Desktop/structure.sql'  # 입력 파일 경로
output_file = 'C:/Users/user/Desktop/메타버스/metamong/structure_clean.sql'  # 출력 파일 경로

with open(input_file, 'rb') as file:
    content = file.read()

# NULL 문자를 제거
cleaned_content = content.replace(b'\0', b'')

with open(output_file, 'wb') as file:
    file.write(cleaned_content)

print(f"NULL 문자가 제거된 파일이 '{output_file}'에 저장되었습니다.")
