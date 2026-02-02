#!/usr/bin/env python3
import pandas as pd
import json
import os

# Конвертация Excel в JSON
def convert_excel_to_json(excel_path, output_dir='data'):
    os.makedirs(output_dir, exist_ok=True)
    
    excel_file = pd.ExcelFile(excel_path)
    
    for sheet_name in excel_file.sheet_names:
        print(f"Конвертирую: {sheet_name}")
        
        df = pd.read_excel(excel_file, sheet_name=sheet_name)
        
        # Очистка данных
        df = df.dropna(how='all')  # Удаляем пустые строки
        
        # Сохраняем
        output_file = f'{output_dir}/{sheet_name.lower()}.json'
        df.to_json(output_file, orient='records', force_ascii=False, indent=2)
        print(f"✓ Сохранено в {output_file}")

if __name__ == "__main__":
    convert_excel_to_json("CreditMarket_Data.xlsx")
