# Regex File Content Match
Count regex in files

# Input
- `fileNameRegex`: Regex used to match the file name
- `fileContentRegex`: Regex used to match the content

# Output
- `count`: Number of matches

# Example
```yaml
on: [push]

jobs:
  count_new_lines:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Count JavaScript Lines
        id: count_js_new_lines
        uses: ./
        with:
          fileNameRegex: '^(.*)\.js$'
          fileContentRegex: '\n'
      - name: Print Count
        shell: bash
        run: echo "The count is ${{ steps.count_js_new_lines.outputs.count }}"
```
