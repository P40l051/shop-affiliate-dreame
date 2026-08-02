export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white text-sm text-neutral-600">
      <div className="container-tight py-8 grid gap-6 sm:grid-cols-3">
        <div className="sm:col-span-2">
          <div className="font-semibold text-neutral-900 mb-2">
            RobotAspirapolvere.pro
          </div>
          <p className="text-xs">
            Recensioni indipendenti di robot aspirapolvere. Sito affiliato Amazon
            — guadagniamo una piccola commissione sugli acquisti idonei, senza
            costo extra per te. Vedi la sezione Disclosure in ogni scheda
            prodotto per i dettagli.
          </p>
        </div>
        <div>
          <div className="font-semibold text-neutral-900 mb-2">Naviga</div>
          <ul className="space-y-1 text-xs">
            <li>
              <a className="hover:text-amazon-600" href="/">Classifica robot aspirapolvere</a>
            </li>
            <li>
              <a className="hover:text-amazon-600" href="/blog">Guide acquisto</a>
            </li>
            <li>
              <a className="hover:text-amazon-600" href="/chi-siamo">Chi siamo e come testiamo</a>
            </li>
            <li>
              <a className="hover:text-amazon-600" href="/prodotto/dreame-l40-ultra-ae">Dreame L40 Ultra AE</a>
            </li>
            <li>
              <a className="hover:text-amazon-600" href="/prodotto/roborock-qv-35a">Roborock QV 35A</a>
            </li>
          </ul>
        </div>
        <div className="sm:col-span-3">
          <div className="font-semibold text-neutral-900 mb-2">Compliance</div>
          <ul className="space-y-1 text-xs">
            <li>Programma Affiliazione Amazon.it</li>
            <li>Cookie tracciamento: 24 ore</li>
            <li>
              AGCM Provv. n. 25411/2018 · IAP · Operating Agreement Amazon EU
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-neutral-200 py-3 text-center text-xs text-neutral-500">
        © 2026 RobotAspirapolvere.pro — Tutti i marchi sono dei rispettivi
        proprietari.
      </div>
    </footer>
  );
}
