<?php

namespace App\Support;

use Symfony\Component\HttpFoundation\StreamedResponse;

class Csv
{
    /**
     * Stream rows as a CSV download without building the file in memory.
     *
     * @param  list<string>  $header
     * @param  iterable<list<string|null>>  $rows
     */
    public static function download(string $filename, array $header, iterable $rows): StreamedResponse
    {
        return response()->streamDownload(function () use ($header, $rows) {
            $out = fopen('php://output', 'w');

            // UTF-8 byte-order mark: without it Excel decodes the file as
            // the system code page and Arabic names turn into mojibake.
            fwrite($out, "\u{FEFF}");
            fputcsv($out, $header, escape: '');

            foreach ($rows as $row) {
                fputcsv($out, array_map(self::neutralize(...), $row), escape: '');
            }

            fclose($out);
        }, $filename, ['Content-Type' => 'text/csv; charset=UTF-8']);
    }

    /**
     * Contact-form fields are typed by anonymous visitors. A cell starting
     * with = + - @ (or a tab/CR) is evaluated as a formula when the export
     * is opened in a spreadsheet, so it gets a leading apostrophe.
     */
    private static function neutralize(?string $value): string
    {
        $value ??= '';

        return preg_match('/^[=+\-@\t\r]/', $value) === 1 ? "'".$value : $value;
    }
}
