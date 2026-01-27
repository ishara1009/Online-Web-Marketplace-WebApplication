import os
import re

def remove_emojis_from_file(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # Remove specific emoji patterns commonly found in the code
        cleaned_content = content
        
        # Remove common emojis we found in the grep search
        emojis_to_remove = [
            '📞', '🛒', '🔍', '👤', '➕', '☰', '✕', '★', '🎚️', '✓', '✗',
            '👍', '🗑️', '💡', '🔒', '💳', '💰', '🏦', '📦', '💵', '📊',
            '💹', '⏱️', '📈', '🏆', '💳', '📥', '📄', '📋', '👥', '🏷️',
            '🌐', '💡', '🎯', '📝', '⚡', '⚙️', '🏪', '💾', '🔔', '🔐',
            '⚠️', '📍', '🛍️', '❤️', '💬', '✏️', '📷', '📧', '📱', '⚧',
            '📅', '✅', '🐦', '📺'
        ]
        
        for emoji in emojis_to_remove:
            cleaned_content = cleaned_content.replace(emoji, '')
        
        # Only write if content changed
        if cleaned_content != content:
            with open(file_path, 'w', encoding='utf-8') as file:
                file.write(cleaned_content)
            print(f"✓ Cleaned: {os.path.basename(file_path)}")
            return True
        return False
    except Exception as e:
        print(f"✗ Error processing {file_path}: {e}")
        return False

# Process all JS files in frontend/src
src_dir = r"e:\New GitHub Projects\Web App for Sales - MERN\Online-Web-Marketplace-WebApplication\frontend\src"
files_processed = 0
files_cleaned = 0

for root, dirs, files in os.walk(src_dir):
    for file in files:
        if file.endswith('.js') or file.endswith('.jsx'):
            file_path = os.path.join(root, file)
            files_processed += 1
            if remove_emojis_from_file(file_path):
                files_cleaned += 1

print(f"\nTotal files processed: {files_processed}")
print(f"Files cleaned: {files_cleaned}")
