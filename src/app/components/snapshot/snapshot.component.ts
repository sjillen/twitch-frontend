import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { SnapshotService } from '../../services/snapshot.service';
import { Snapshot } from '../../models/snapshot';

@Component({
  selector: 'app-snapshot',
  templateUrl: './snapshot.component.html',
  styleUrls: ['./snapshot.component.scss'],
})
export class SnapshotComponent implements OnInit, OnDestroy {
  @Input() gameId: number;

  snapshots: Snapshot[] = [];
  latestSnapshots: Snapshot[];
  private subLatest: Subscription;
  constructor(private snapshotService: SnapshotService) {}

  ngOnInit() {
    this.subLatest = this.snapshotService.snapshots
      .pipe()
      .subscribe(snapshots => (this.latestSnapshots = snapshots));
  }

  ngOnDestroy() {
    this.subLatest.unsubscribe();
  }

  getSnapshots(): void {
    this.snapshotService
      .getSnapshots()
      .subscribe(snapshots => (this.snapshots = snapshots));
  }

  getLatestGameSnapshot(): Snapshot {
    return this.latestSnapshots.find(s => s.gameId === this.gameId);
  }
}
