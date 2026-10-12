# Verana Certification Program: curriculum

The open training material of the [Verana Certification Program](https://veranafoundation.org/certification): modules, role tracks, organization designations and the directory of Authorized Certificators.

Everything here is rendered on veranafoundation.org. The website is the source of information for candidates and companies; this repository is where the material is authored and reviewed, by the Showcase and Certification Working Group of the Verana Foundation.

## Layout

| Path | What |
|---|---|
| `program.json` | The program manifest: version, protocol versions, levels, modules, tracks, designations. The website reads it. |
| `modules/<code>/README.md` | One module per folder. Flat front matter (code, title, hours, assessment, version, status, summary) then the material. Labs live next to it when a module has one. |
| `tracks/README.md` | Human-readable description of the tracks. The machine-readable list is in `program.json`. |
| `certificators.json` | The directory of Authorized Certificators, maintained by the Certification Office. |
| `scripts/validate.mjs` | Consistency checks, run in CI. |

## Program versions

The program version follows the Verana protocol it teaches. `2026.1` teaches Verifiable Trust v4 and the Verifiable Public Registry v4. A delta module is published with each major protocol version.

## Contributing

See `CONTRIBUTING.md`. Curriculum changes are reviewed in a session of the Showcase and Certification Working Group. Question banks, grading rubrics and lab solutions are confidential and live in a private repository; never add them here.

## License

Creative Commons Attribution-ShareAlike 4.0 International. See `LICENSE`.
