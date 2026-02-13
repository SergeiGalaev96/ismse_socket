import json

def replace_links_with_docid(obj):
    if isinstance(obj, dict):
        new_obj = {}
        for key, value in obj.items():
            if key == "link":
                new_obj["docId"] = ""  # заменяем "link" на "docId"
            else:
                new_obj[key] = replace_links_with_docid(value)
        return new_obj
    elif isinstance(obj, list):
        return [replace_links_with_docid(item) for item in obj]
    else:
        return obj

def main():
    input_path = r"D:\mkb\data_4.json"
    output_path = r"D:\mkb\data_5.json"

    with open(input_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    transformed = replace_links_with_docid(data)

    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(transformed, f, ensure_ascii=False, indent=2)

    print(f"✅ Поля 'link' заменены на 'docId'. Сохранено в {output_path}")

if __name__ == "__main__":
    main()