Set-Location 'D:\workdev\SDA\week 3\resume (react)'
$targetFolder = 'resume(react)'
if (-not (Test-Path $targetFolder)) {
    New-Item -ItemType Directory -Path $targetFolder | Out-Null
}
$files = git ls-files
foreach ($src in $files) {
    $dst = Join-Path $targetFolder $src
    $parent = Split-Path $dst -Parent
    if (-not (Test-Path $parent)) {
        New-Item -ItemType Directory -Force -Path $parent | Out-Null
    }
    git mv --force -- "$src" "$dst"
}
git add -A
if (git diff --cached --quiet) {
    Write-Host 'No staged changes'
} else {
    git commit -m 'Move project into resume(react) folder'
    git push origin master
}
